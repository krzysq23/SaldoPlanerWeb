export interface Budget {
  id: number;
  userId: number;
  categoryId: number;
  amountLimit: string;
  amountSpent: string;
  amountRemaining: string;
  status: string;
  percentSpent: number;
  periodType: "MONTHLY" | "ONE_TIME" | "YEARLY";
  startDate: string;
  endDate: string;
  createdAt: string;
}