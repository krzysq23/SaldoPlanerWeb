import api from "../api";
import { ReportReq } from "types";

const REPORTS_FILTER_ENDPOINT = process.env.REACT_APP_REPORTS_FILTER_ENDPOINT ?? "";
const REPORTS_GENERATE_ENDPOINT = process.env.REACT_APP_REPORTS_GENERATE_ENDPOINT ?? "";

class ReportsService {

  async filter(data: ReportReq) {
    const response = await api.post(REPORTS_FILTER_ENDPOINT, data);
    return response.data;
  }

  async generate(data: ReportReq) {
    const response = await api.post(REPORTS_GENERATE_ENDPOINT, data, {
      responseType: "blob"
    });

    const cd = response.headers["content-disposition"] || "";
    const fileNameMatch = cd.match(/filename\*?=(?:UTF-8'')?["']?([^"';]+)["']?/i);
    const fileName = fileNameMatch?.[1] ?? "report.pdf";

    const blob = response.data;
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

  }

}

const reportsService = new ReportsService();
export default reportsService;