import api from "../api";
import { token } from "../token";
import { LoginCredentials, AuthResponse, RegisterCredentials, ChangePassword, Response } from "types";

import categoryService from "../category/categoryService";

const LOGIN_ENDPOINT = process.env.REACT_APP_LOGIN_ENDPOINT ?? "";
const REGISTER_ENDPOINT = process.env.REACT_APP_REGISTER_ENDPOINT ?? "";
const LOGOUT_ENDPOINT = process.env.REACT_APP_LOGOUT_ENDPOINT ?? "";
const CHANGE_PASSWORD_ENDPOINT = process.env.REACT_APP_PASSSWORD_CHANGE_ENDPOINT ?? "";

class AuthService {

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post(LOGIN_ENDPOINT, credentials);
    token.set(response.data.token);
    this.setUser(response.data.user);
    categoryService.updateCacheCategories();
    return response.data;
  }

  async register(credentials: RegisterCredentials): Promise<Response> {
    const response = await api.post(REGISTER_ENDPOINT, credentials);
    return response.data;
  }

  async changePassword(credentials: ChangePassword): Promise<Response> {
    const response = await api.post(CHANGE_PASSWORD_ENDPOINT, credentials);
    return response.data;
  }

  async logout() {
    try {
      await api.post(LOGOUT_ENDPOINT);
    } finally {
      this.clearUserData();
      token.clear();
      window.location.href = "/login";
    }
  }

  sessionExpired(): void {
    localStorage.setItem("APP_NOTIFY_MESSAGE_ERROR", "Twoja sesja wygasła. Zaloguj się ponownie");
    this.logout();
  }

  clearUserData(): void {
    localStorage.removeItem("user");
  }

  setUser(user: object) {
    const userEncoded = this.encodeBase64(JSON.stringify(user));
    localStorage.setItem("user", userEncoded);
  }

  getToken(): string | null {
    return token.get();
  }

  getUserId(): number | null {
    const user = this.getCurrentUser();
    return user?.id ?? null;
  }

  getRoles(): string[] | null {
    const user = this.getCurrentUser();
    return user?.roles ?? null;
  }

  getCurrentUser(): AuthResponse["user"] | null {
    const userDecoded = this.decodeBase64(localStorage.getItem("user") || "");
    return userDecoded ? JSON.parse(userDecoded) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  encodeBase64(str: string): string {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary);
  }

  decodeBase64(base64: string): string {
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, ch => ch.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

}

const authService = new AuthService();
export default authService;