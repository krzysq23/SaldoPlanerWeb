import api from "../api";
import { Category } from "types";
import categoryStore from "./categoryStore";

const CATEGORY_ALL_ENDPOINT = process.env.REACT_APP_CATEGORY_ALL_ENDPOINT ?? "";
const CATEGORY_ADD_ENDPOINT = process.env.REACT_APP_CATEGORY_ADD_ENDPOINT ?? "";
const CATEGORY_REMOVE_ENDPOINT = process.env.REACT_APP_CATEGORY_REMOVE_ENDPOINT ?? "";
const CATEGORY_EDIT_ENDPOINT = process.env.REACT_APP_CATEGORY_EDIT_ENDPOINT ?? "";
 
class CategoryService {

  async updateCacheCategories(): Promise<boolean> {
    try {
      const data = await this.getAllCategories();
      categoryStore.setCategories(data);
      return true;
    } catch (err) {
      categoryStore.setCategories([]);
      return false;
    }
  }

  async getAllCategories(): Promise<Category[]> {
    const response = await api.get(CATEGORY_ALL_ENDPOINT);
    return response.data;
  }

  async addCategory(category: Category): Promise<Response> {
    const response = await api.post(CATEGORY_ADD_ENDPOINT, category);
    return response.data;
  }

  async removeCategory(category: Category): Promise<Category[]> {
    const response = await api.post(CATEGORY_REMOVE_ENDPOINT, category);
    await this.updateCacheCategories();
    return response.data;
  }

  async editCategory(category: Category): Promise<Response> {
    const response = await api.post(CATEGORY_EDIT_ENDPOINT, category);
    await this.updateCacheCategories();
    return response.data;
  }

}

const categoryService = new CategoryService();
export default categoryService;