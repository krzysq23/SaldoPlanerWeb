import axios, { AxiosError, AxiosRequestConfig } from "axios";
import authService from "./auth/authService";
import { token } from "./token";

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// --- request  ---
api.interceptors.request.use((config) => {
  const t = token.get();
  if (t) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>)["Authorization"] = `Bearer ${t}`;
  }
  return config;
});

// --- response: obsługa 401 i odświeżanie ---
let isRefreshing = false;
let queue: ((t: string | null) => void)[] = [];

function subscribeToRefresh(cb: (t: string | null) => void) {
  queue.push(cb);
}
function notifyQueue(newToken: string | null) {
  queue.forEach(cb => cb(newToken));
  queue = [];
}

async function refreshAccessToken(): Promise<string> {
  const res = await axios.post(
    `${api.defaults.baseURL}${process.env.REACT_APP_TOKEN_REFRESH_ENDPOINT}`,
    {},
    { withCredentials: true }
  );
  const newAccess = res.data?.accessToken;
  if (!newAccess) throw new Error("Brak accessToken w odpowiedzi /refresh");
  token.set(newAccess);
  return newAccess;
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };

    const status = error.response?.status;
    if (status === 401 && !original?._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeToRefresh((newTok) => {
            if (!newTok) return reject(error);
            original.headers = original.headers ?? {};
            (original.headers as Record<string, string>)["Authorization"] = `Bearer ${newTok}`;
            resolve(api(original));
          });
        });
      }

      try {
        isRefreshing = true;
        const newTok = await refreshAccessToken();
        notifyQueue(newTok);
        original.headers = original.headers ?? {};
        (original.headers as Record<string, string>)["Authorization"] = `Bearer ${newTok}`;
        return api(original);
      } catch (e) {
        notifyQueue(null);
        authService.sessionExpired();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;