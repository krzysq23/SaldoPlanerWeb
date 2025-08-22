export interface AuthResponse {
  token: string;
  user: {
    id: number;
    login: string;
    email: string;
    userName: string;
  };
}