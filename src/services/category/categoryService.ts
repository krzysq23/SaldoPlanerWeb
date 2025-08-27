import { Category, Response } from "types";

import { handleResponse } from "../utils/apiHandler";

import authService from "../auth/authService";

const API_URL = process.env.REACT_APP_API_URL;
  
class CategoryService {

  async getAllCategories(): Promise<Category[]> {
    const userId = authService.getUserId();
    const response = await fetch(`${API_URL}` + `${process.env.REACT_APP_CATEGORY_ALL_ENDPOINT}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    await handleResponse(response, "Błąd podczas pobierania kategorii");

    return await response.json();
  }

  async addCategory(category: Category): Promise<Response> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_CATEGORY_ADD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(category)
    });

    await handleResponse(response, "Błąd podczas dodawania kategorii");

    return await response.json();
  }

  async removeCategory(category: Category): Promise<Category[]> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_CATEGORY_REMOVE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(category)
    });

    await handleResponse(response, "Błąd podczas usuwania kategorii");

    return await response.json();
  }

  async editCategory(category: Category): Promise<Response> {
    const response = await fetch(`${API_URL}` + process.env.REACT_APP_CATEGORY_EDIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(category)
    });

    await handleResponse(response, "Błąd podczas edycji kategorii");

    return await response.json();
  }

}

const categoryService = new CategoryService();
export default categoryService;