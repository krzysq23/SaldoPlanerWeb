import { Dashboard } from "types";

import { handleResponse } from "../utils/apiHandler";

const API_URL = process.env.REACT_APP_API_URL;
  
class DashboardService {

  async getInfo(): Promise<Dashboard[]> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_DASHBOARD_INFO_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    await handleResponse(response, "Błąd podczas pobierania");

    return await response.json();
  }

}

const dashboardService = new DashboardService();
export default dashboardService;