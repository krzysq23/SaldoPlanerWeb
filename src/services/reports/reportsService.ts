import { ReportReq, Report } from "types";

import { handleResponse } from "../utils/apiHandler";

const API_URL = process.env.REACT_APP_API_URL;
  
class ReportsService {

  async filter(data: ReportReq): Promise<Report> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_REPORTS_FILTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data)
    });

    await handleResponse(response, "Błąd podczas pobierania");

    return await response.json();
  }

  async generate(data: ReportReq): Promise<Report> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_REPORTS_GENERATE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data)
    });

    await handleResponse(response, "Błąd podczas generowania raportu");

    return await response.json();
  }

}

const reportsService = new ReportsService();
export default reportsService;