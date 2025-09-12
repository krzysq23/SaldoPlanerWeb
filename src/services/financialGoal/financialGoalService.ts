import api from "../api";
import { FinancialGoal } from "types";

const FINANCIAL_GOAL_BY_DATE_ENDPOINT = process.env.REACT_APP_FINANCIAL_GOAL_BY_DATE_ENDPOINT ?? "";
const FINANCIAL_GOAL_ADD_ENDPOINT = process.env.REACT_APP_FINANCIAL_GOAL_ADD_ENDPOINT ?? "";
const FINANCIAL_GOAL_REMOVE_ENDPOINT = process.env.REACT_APP_FINANCIAL_GOAL_REMOVE_ENDPOINT ?? "";
const FINANCIAL_GOAL_EDIT_ENDPOINT = process.env.REACT_APP_FINANCIAL_GOAL_EDIT_ENDPOINT ?? "";
  
class FinancialGoalService {

  async getAllFinancialGoals() {
    const response = await api.get(FINANCIAL_GOAL_BY_DATE_ENDPOINT);
    return response.data;
  }

  async addFinancialGoal(financialGoal: FinancialGoal) {
    const response = await api.post(FINANCIAL_GOAL_ADD_ENDPOINT, financialGoal);
    return response.data;
  }

  async removeFinancialGoal(financialGoal: FinancialGoal){
    const response = await api.post(FINANCIAL_GOAL_REMOVE_ENDPOINT, financialGoal);
    return response.data;
  }

  async editFinancialGoal(financialGoal: FinancialGoal) {
    const response = await api.post(FINANCIAL_GOAL_EDIT_ENDPOINT, financialGoal);
    return response.data;
  }

}

const financialGoalService = new FinancialGoalService();
export default financialGoalService;