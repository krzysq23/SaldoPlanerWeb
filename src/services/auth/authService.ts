import { LoginCredentials, AuthResponse, RegisterCredentials, RegisterResponse } from "types";

import { handleResponse } from "../utils/apiHandler";

const API_URL = process.env.REACT_APP_API_URL;
  
class AuthService {

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    await handleResponse(response, "Błąd logowania");

    const data: AuthResponse = await response.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  }

  async register(credentials: RegisterCredentials): Promise<RegisterResponse> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    await handleResponse(response, "Błąd przy tworzeniu konta");

    const data: RegisterResponse = await response.json();

    return data;
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("APP_NOTIFY_MESSAGE_ERROR", "Twoja sesja wygasła. Zaloguj się ponownie");
    window.location.href = "/authentication/session-expired";
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getCurrentUser(): AuthResponse["user"] | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

const authService = new AuthService();
export default authService;