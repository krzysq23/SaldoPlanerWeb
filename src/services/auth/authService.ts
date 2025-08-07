export interface LoginCredentials {
  login: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    login: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Błąd logowania");
    }

    const data: AuthResponse = await response.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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