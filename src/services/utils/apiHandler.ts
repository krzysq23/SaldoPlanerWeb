import { useNavigate } from "react-router-dom";

import authService from "../auth/authService";

export async function handleResponse(response: Response, message: String): Promise<Response> {

  if (response.status === 401) {
    authService.logout();
    throw new Error("Sesja wygasła - zaloguj się ponownie");
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || message || "Błąd serwera");
  }

  return response;
}