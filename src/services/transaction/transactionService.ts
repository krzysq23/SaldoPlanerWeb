import api from "../api";
import { Transaction } from "types";

const TRANSACTION_BY_DATE_ENDPOINT = process.env.REACT_APP_TRANSACTION_BY_DATE_ENDPOINT ?? "";
const TRANSACTION_ADD_ENDPOINT = process.env.REACT_APP_TRANSACTION_ADD_ENDPOINT ?? "";
const TRANSACTION_EDIT_ENDPOINT = process.env.REACT_APP_TRANSACTION_EDIT_ENDPOINT ?? "";
const TRANSACTION_REMOVE_ENDPOINT = process.env.REACT_APP_TRANSACTION_REMOVE_ENDPOINT ?? "";

class TransactionService {

  async getTransactions(range: string) {
    const body = {
      dateRange: range
    }
    const response = await api.post(TRANSACTION_BY_DATE_ENDPOINT, body);
    return response.data;
  }

  async addTransaction(transaction: Transaction) {
    const response = await api.post(TRANSACTION_ADD_ENDPOINT, transaction);
    return response.data;
  }

  async removeTransaction(transaction: Transaction) {
    const response = await api.post(TRANSACTION_REMOVE_ENDPOINT, transaction);
    return response.data;
  }

  async editTransaction(transaction: Transaction) {
    const response = await api.post(TRANSACTION_EDIT_ENDPOINT, transaction);
    return response.data;
  }

}

const transactionService = new TransactionService();
export default transactionService;