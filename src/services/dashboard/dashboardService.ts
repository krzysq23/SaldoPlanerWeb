import api from "../api";

const DASHBOARD_INFO_ENDPOINT = process.env.REACT_APP_DASHBOARD_INFO_ENDPOINT ?? "";
  
class DashboardService {

  async getInfo() {
    const response = await api.get(DASHBOARD_INFO_ENDPOINT);
    return response.data;
  }

}

const dashboardService = new DashboardService();
export default dashboardService;