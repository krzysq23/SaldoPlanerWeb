import { LoginCredentials, AuthResponse, RegisterCredentials, ChangePassword, Response } from "types";

import { handleResponse } from "../utils/apiHandler";

import categoryService from "../category/categoryService";

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

    this.setToken(data.token);
    this.setUser(data.user);
    
    categoryService.updateCacheCategories();

    return data;
  }

  async register(credentials: RegisterCredentials): Promise<Response> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    await handleResponse(response, "Błąd przy tworzeniu konta");

    const data: Response = await response.json();

    return data;
  }

  async changePassword(credentials: ChangePassword): Promise<Response> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_PASSSWORD_CHANGE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    await handleResponse(response, "Błąd przy zmianie hasła");

    const data: Response = await response.json();

    return data;
  }

  logout(): void {
    this.clearUserData();
    window.location.href = "/authentication/login";
  }

  sessionExpired(): void {
    localStorage.setItem("APP_NOTIFY_MESSAGE_ERROR", "Twoja sesja wygasła. Zaloguj się ponownie");
    this.logout();
  }

  clearUserData(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  setUser(user: object) {
    const userEncoded = this.encodeBase64(JSON.stringify(user));
    localStorage.setItem("user", userEncoded);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
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