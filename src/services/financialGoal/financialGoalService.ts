import { FinancialGoal, Response } from "types";

import { handleResponse } from "../utils/apiHandler";

import authService from "../auth/authService";

const API_URL = process.env.REACT_APP_API_URL;
  
class FinancialGoalService {

  async getAllFinancialGoals(): Promise<FinancialGoal[]> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_FINANCIAL_GOAL_BY_DATE_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    await handleResponse(response, "Błąd podczas pobierania celów finansowych");

    return await response.json();
  }

  async addFinancialGoal(financialGoal: FinancialGoal): Promise<Response> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_FINANCIAL_GOAL_ADD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(financialGoal)
    });

    await handleResponse(response, "Błąd podczas dodawania celu finansowego");

    return await response.json();
  }

  async removeFinancialGoal(financialGoal: FinancialGoal): Promise<FinancialGoal[]> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_FINANCIAL_GOAL_REMOVE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(financialGoal)
    });

    await handleResponse(response, "Błąd podczas usuwania transakcji");

    return await response.json();
  }

  async editFinancialGoal(financialGoal: FinancialGoal): Promise<Response> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_FINANCIAL_GOAL_EDIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(financialGoal)
    });

    await handleResponse(response, "Błąd podczas edycji celu finansowego");

    return await response.json();
  }

}

const financialGoalService = new FinancialGoalService();
export default financialGoalService;