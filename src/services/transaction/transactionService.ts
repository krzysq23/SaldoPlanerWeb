import { Transaction, Response } from "types";

import { handleResponse } from "../utils/apiHandler";

const API_URL = process.env.REACT_APP_API_URL;
  
class TransactionService {

  async getTransactions(range: string): Promise<Transaction[]> {
    const body = {
      dateRange: range
    }
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_TRANSACTION_BY_DATE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body)
    });

    await handleResponse(response, "Błąd podczas pobierania kategorii");

    return await response.json();
  }

  async addTransaction(transaction: Transaction): Promise<Response> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_TRANSACTION_ADD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(transaction)
    });

    await handleResponse(response, "Błąd podczas dodawania transakcji");

    return await response.json();
  }

  async removeTransaction(transaction: Transaction): Promise<Transaction[]> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_TRANSACTION_REMOVE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(transaction)
    });

    await handleResponse(response, "Błąd podczas usuwania transakcji");

    return await response.json();
  }

  async editTransaction(transaction: Transaction): Promise<Response> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_TRANSACTION_EDIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(transaction)
    });

    await handleResponse(response, "Błąd podczas edycji transakcji");

    return await response.json();
  }

}

const transactionService = new TransactionService();
export default transactionService;