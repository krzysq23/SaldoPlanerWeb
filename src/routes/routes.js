import Default from "pages/dashboard";
import SignInCover from "pages/authentication/login";
import SignUpCover from "pages/authentication/register"
import Error404 from "pages/error/404";
import Error500 from "pages/error/500";
import Transactions from "pages/finance/transactions";
import Categories from "pages/finance/categories";
import Budgets from "pages/finance/budgets";
import Goals from "pages/finance/goals";
import Reports from "pages/finance/reports";
import TransactionCalendar from "pages/calendar";
import Profile from "pages/profile";
import UserManager from "pages/settings/users";
import AppSettings from "pages/settings/application";
import AddUser from "pages/settings/users/new";
import EditUser from "pages/settings/users/edit";
import CategoryForm from "pages/finance/categories/form";
import TransactionForm from "pages/finance/transactions/form";
import BudgetForm from "pages/finance/budgets/form";

// Soft UI Dashboard PRO React icons
import Shop from "layouts/Icons/Shop";
import Office from "layouts/Icons/Office";
import Document from "layouts/Icons/Document";
import CustomerSupport from "layouts/Icons/CustomerSupport";
import Settings from "layouts/Icons/Settings";
import SpaceShip from "layouts/Icons/SpaceShip";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Shop size="12px" />,
    roles: ["ALL_USERS"],
    collapse: [
      {
        name: "Podsumowanie",
        key: "financeSummary",
        route: "/dashboard",
        component: <Default />,
      }
    ]
  },
  {
    type: "collapse",
    name: "Finanse",
    key: "finance",
    icon: <Office size="12px" />,
    roles: ["ALL_USERS"],
    collapse: [
      {
        name: "Transakcje",
        key: "transactions",
        route: "/finance/transactions",
        component: <Transactions />,
      },
      {
        name: "Kategorie",
        key: "categories",
        route: "/finance/categories",
        component: <Categories />,
      },
      {
        name: "Budżety",
        key: "budgets",
        route: "/finance/budgets",
        component: <Budgets />,
      },
      {
        name: "Cele finansowe",
        key: "goals",
        route: "/finance/goals",
        component: <Goals />,
      },
      {
        name: "Raporty",
        key: "reports",
        route: "/finance/reports",
        component: <Reports />,
      },
    ]
  },
  {
    type: "collapse",
    name: "Zarządzanie czasem",
    key: "calendar",
    icon: <SpaceShip size="12px" />,
    roles: ["ALL_USERS"],
    collapse: [
      {
        name: "Kalendarz",
        key: "calendar",
        route: "/calendar",
        component: <TransactionCalendar />,
      }
    ]
  },
  { type: "title", title: "Profil", key: "title-settings" },
  { type: "divider", key: "divider-1" },
  {
    type: "collapse",
    name: "Użytkownik",
    key: "profile",
    icon: <CustomerSupport size="12px" />,
    roles: ["ALL_USERS"],
    collapse: [
      {
        name: "Konto",
        key: "profile",
        route: "/profile",
        component: <Profile />,
      }
    ]
  },
  { type: "title", title: "Ustawienia", key: "title-settings2", roles: ["ADMIN"] },
  { type: "divider", key: "divider-2", roles: ["ADMIN"] },
  {
    type: "collapse",
    name: "Ustawienia",
    key: "settings",
    icon: <Settings size="12px" />,
    roles: ["ADMIN"],
    collapse: [
      {
        name: "Użytkownicy",
        key: "userManagement",
        route: "/settings/users",
        component: <UserManager />,
      },
      {
        name: "Ustawienia aplikacji ",
        key: "appSettings",
        route: "/settings/application",
        component: <AppSettings />,
      }
    ]
  },
  {
    name: "Użytkownicy",
    key: "users",
    roles: ["ADMIN"],
    collapse: [
      {
        name: "Użytkownicy",
        key: "addUser",
        route: "/user/add",
        component: <AddUser />,
      },
      {
        name: "Ustawienia aplikacji ",
        key: "editUser",
        route: "/user/edit/:userId",
        component: <EditUser />,
      }
    ]
  },
  {
    name: "Kategorie",
    key: "category",
    roles: ["ALL_USERS"],
    collapse: [
      {
        name: "Kategorie",
        key: "categoryForm",
        route: "/finance/categories/form",
        component: <CategoryForm />,
      }
    ]
  },
  {
    name: "Transakcje",
    key: "transaction",
    roles: ["ALL_USERS"],
    collapse: [
      {
        name: "Transakcje",
        key: "transactionForm",
        route: "/finance/transactions/form",
        component: <TransactionForm />,
      }
    ]
  },
  {
    name: "Budżety",
    key: "budget",
    roles: ["ALL_USERS"],
    collapse: [
      {
        name: "Budżet",
        key: "budgetForm",
        route: "/finance/budgets/form",
        component: <BudgetForm />,
      }
    ]
  },
  {
    name: "Authentication",
    key: "authentication",
    roles: ["PUBLIC"],
    collapse: [
      {
        name: "Login",
        key: "login",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/login",
            component: <SignInCover />,
          }
        ],
      },
      {
        name: "Register",
        key: "register",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/register",
            component: <SignUpCover />,
          }
        ],
      },
      {
        name: "Error",
        key: "error",
        roles: ["PUBLIC"],
        collapse: [
          {
            name: "Error 404",
            key: "error-404",
            route: "/error/404",
            component: <Error404 />,
          },
          {
            name: "Error 500",
            key: "error-500",
            route: "/error/500",
            component: <Error500 />,
          },
        ],
      },
    ]
  }
];

export default routes;
