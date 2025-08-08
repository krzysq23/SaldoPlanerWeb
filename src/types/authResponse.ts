export interface AuthResponse {
  token: string;
  user: {
    login: string;
    email: string;
    userName: string;
  };
}