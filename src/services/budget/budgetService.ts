import { Budget, Response } from "types";

import { handleResponse } from "../utils/apiHandler";

import authService from "../auth/authService";

const API_URL = process.env.REACT_APP_API_URL;
  
class BudgetService {

  async getBudgets(periodType: string, categoryId: number): Promise<Budget[]> {
    const body = {
      userId: authService.getUserId()
    }
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_BUDGET_ENDPOINT, {
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

  async addBudget(budget: Budget): Promise<Response> {
    budget.startDate = new Date(budget.startDate).toISOString().split("T")[0];
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_BUDGET_ADD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(budget)
    });

    await handleResponse(response, "Błąd podczas dodawania transakcji");

    return await response.json();
  }

  async removeBudget(budget: Budget): Promise<Budget[]> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_BUDGET_REMOVE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(budget)
    });

    await handleResponse(response, "Błąd podczas usuwania transakcji");

    return await response.json();
  }

  async editBudget(budget: Budget): Promise<Response> {
    budget.startDate = new Date(budget.startDate).toISOString().split("T")[0];
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_BUDGET_EDIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(budget)
    });

    await handleResponse(response, "Błąd podczas edycji transakcji");

    return await response.json();
  }

}

const budgetService = new BudgetService();
export default budgetService;