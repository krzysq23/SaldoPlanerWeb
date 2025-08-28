import { Category } from "types";

let categoriesCache: Category[] = loadFromStorage();

function loadFromStorage(): Category[] {
  const data = localStorage.getItem("categories");
  return data ? JSON.parse(data) : [];
}

function saveToStorage(categories: Category[]) {
  localStorage.setItem("categories", JSON.stringify(categories));
}

const categoryStore = {

  getCategories(): Category[] {
    return categoriesCache;
  },

  setCategories(categories: Category[]): void {
    categoriesCache = categories;
    saveToStorage(categories);
  },

  findById(id: number): Category | undefined {
    return categoriesCache.find((c) => c.id === id);
  },
};

export default categoryStore;