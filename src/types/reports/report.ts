export interface ReportReq {
  dateStart: string;
  dateEnd: string;
  categories: string[];
  transactionType: string;
}

export interface Report {
  dateStart: string;
  dateEnd: string;
  categories: string[];
  transactionType: string;
}