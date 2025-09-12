import api from "../api";
import { Budget } from "types";
import { formatYMD } from "../../utils/dateUtil";

const BUDGET_ENDPOINT = process.env.REACT_APP_BUDGET_ENDPOINT ?? "";
const BUDGET_ADD_ENDPOINT = process.env.REACT_APP_BUDGET_ADD_ENDPOINT ?? "";
const BUDGET_REMOVE_ENDPOINT = process.env.REACT_APP_BUDGET_REMOVE_ENDPOINT ?? "";
const BUDGET_EDIT_ENDPOINT = process.env.REACT_APP_BUDGET_EDIT_ENDPOINT ?? "";

class BudgetService {

  async getBudgets(periodType: string, categoryId: number) {
    const body = {
      periodType: periodType,
      categoryId: categoryId
    }
    const response = await api.post(BUDGET_ENDPOINT, body);
    return response.data;
  }

  async addBudget(budget: Budget) {
    budget.startDate = formatYMD(new Date(budget.startDate));
    const response = await api.post(BUDGET_ADD_ENDPOINT, budget);
    return response.data;
  }

  async removeBudget(budget: Budget) {
    const response = await api.post(BUDGET_REMOVE_ENDPOINT, budget);
    return response.data;
  }

  async editBudget(budget: Budget) {
    budget.startDate = formatYMD(new Date(budget.startDate));
    const response = await api.post(BUDGET_EDIT_ENDPOINT, budget);
    return response.data;
  }

}

const budgetService = new BudgetService();
export default budgetService;