export interface Transaction {
  id: number;
  userId: number;
  categoryId: number;
  amount: string;
  date: string;
  description: string;
  createdAt: string;
}