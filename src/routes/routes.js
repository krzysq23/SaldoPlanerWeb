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
import Calendar from "pages/calendar";
import User from "pages/user";
import UserManager from "pages/settings/users";
import AppSettings from "pages/settings/application";

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
    collapse: [
      {
        name: "Kalendarz",
        key: "calendar",
        route: "/calendar",
        component: <Calendar />,
      }
    ]
  },
  { type: "title", title: "Ustawienia", key: "title-settings" },
  { type: "divider", key: "divider-1" },
  {
    type: "collapse",
    name: "Użytkownik",
    key: "user",
    icon: <CustomerSupport size="12px" />,
    collapse: [
      {
        name: "Konto",
        key: "userAccount",
        route: "/user",
        component: <User />,
      }
    ]
  },
  {
    type: "collapse",
    name: "Ustawienia",
    key: "settings",
    icon: <Settings size="12px" />,
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
    name: "Authentication",
    key: "authentication",
    icon: <Document size="12px" />,
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
