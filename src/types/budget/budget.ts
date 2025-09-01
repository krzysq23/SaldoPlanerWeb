export interface Budget {
  id: number;
  userId: number;
  categoryId: number;
  amountLimit: string;
  amountSpent: string;
  amountRemaining: string;
  progress: string;
  status: string;
  periodType: "MONTHLY" | "WEEKLY" | "YEARLY" | "ALL";
  startDate: string;
  endDate: string;
  createdAt: string;
}