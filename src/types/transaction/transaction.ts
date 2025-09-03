export interface Transaction {
  id: number;
  userId: number;
  categoryId: number;
  amount: string;
  date: string;
  description: string;
  type: string;
  createdAt: string;
}