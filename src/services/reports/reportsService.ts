import api from "services/api";
import { ReportReq } from "types";
import { downloadBlobResponse } from "utils/downloadUtil";

const REPORTS_FILTER_ENDPOINT = process.env.REACT_APP_REPORTS_FILTER_ENDPOINT ?? "";
const REPORTS_GENERATE_ENDPOINT = process.env.REACT_APP_REPORTS_GENERATE_ENDPOINT ?? "";

class ReportsService {

  async filter(data: ReportReq) {
    const response = await api.post(REPORTS_FILTER_ENDPOINT, data);
    return response.data;
  }

  async generate(data: ReportReq, format: "pdf" | "csv" | "xlsx") {
    const response = await api.post(`${REPORTS_GENERATE_ENDPOINT}/${format}`, data, {
      responseType: "blob"
    });

    for (const [key, value] of Object.entries(response.headers)) {
  console.log(key, value);
}

    await downloadBlobResponse(response.data, response.headers, format, "report");
  }

}

const reportsService = new ReportsService();
export default reportsService;