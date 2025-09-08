import authService from "../auth/authService";

export async function handleResponse(response: Response, message: String): Promise<Response> {

  if (response.status === 401) {
    const data = await response.json();
    if (data.message && data.message.includes("Sesja wygasła")) {
        authService.sessionExpired();
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || message || "Błąd serwera");
  }

  return response;
}