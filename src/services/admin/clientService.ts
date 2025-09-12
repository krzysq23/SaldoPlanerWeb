import api from "../api";
import { Client } from "types";

const CLIENTS_ENDPOINT = process.env.REACT_APP_CLIENTS_ENDPOINT ?? "";
const GET_CLIENT_ENDPOINT = process.env.REACT_APP_GET_CLIENT_ENDPOINT ?? "";
const ADD_CLIENT_ENDPOINT = process.env.REACT_APP_ADD_CLIENT_ENDPOINT ?? "";
const EDIT_CLIENT_ENDPOINT = process.env.REACT_APP_EDIT_CLIENT_ENDPOINT ?? "";
const CHANGE_PASSWORD_CLIENT_ENDPOINT = process.env.REACT_APP_CHANGE_PASSWORD_CLIENT_ENDPOINT ?? "";
const REMOVE_CLIENT_ENDPOINT = process.env.REACT_APP_REMOVE_CLIENT_ENDPOINT ?? "";

class ClientService {

  async getClients(): Promise<Client[]> {
    const response = await api.get(CLIENTS_ENDPOINT);
    return response.data;
  }

  async getClientById(id: string): Promise<Client> {
    const response = await api.get(`${GET_CLIENT_ENDPOINT}/${id}`);
    return response.data;
  }

  async addClient(client: Client): Promise<Response> {
    const response = await api.post(ADD_CLIENT_ENDPOINT, client);
    return response.data;
  }

  async editlient(client: Client): Promise<Response> {
    const response = await api.post(EDIT_CLIENT_ENDPOINT, client);
    return response.data;
  }

  async changePassword(client: Client): Promise<Client> {
    const response = await api.post(CHANGE_PASSWORD_CLIENT_ENDPOINT, client);
    return response.data;
  }

  async removeClient(id: String): Promise<Response> {
    const response = await api.get(`${REMOVE_CLIENT_ENDPOINT}/${id}`);
    return response.data;
  }

}

const clientService = new ClientService();
export default clientService;