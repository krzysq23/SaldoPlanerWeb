import { Client } from "types";

import { handleResponse } from "../utils/apiHandler";

const API_URL = process.env.REACT_APP_API_URL;

class ClientService {

  async getClients(): Promise<Client[]> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_CLIENTS_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    await handleResponse(response, "Błąd pobierania klientów");

    return await response.json();
  }

  async getClientById(id: string): Promise<Client> {
    const response = await fetch(`${API_URL}` + `${process.env.REACT_APP_GET_CLIENTS_ENDPOINT}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Błąd pobierania klienta");
    }

    return await response.json();
  }

  async addClient(client: Client): Promise<Client> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_ADD_CLIENT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(client),
    });

    await handleResponse(response, "Błąd dodawania klienta");

    return await response.json();
  }
}

const clientService = new ClientService();
export default clientService;