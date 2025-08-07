// Soft UI Dashboard PRO React icons
import Shop from "layouts/Icons/Shop";
import Office from "layouts/Icons/Office";
import Document from "layouts/Icons/Document";
import CustomerSupport from "layouts/Icons/CustomerSupport";
import Cube from "layouts/Icons/Cube";
import SpaceShip from "layouts/Icons/SpaceShip";

const pageRoutes = [
    {
    name: "Dashboards",
    key: "dashboards",
    icon: <Shop size="12px" color="white" />,
    collapse: [
      {
        name: "dashboard",
        key: "dashboard",
        route: "/dashboard",
      }
    ]
  },
  {
    name: "Sign In",
    key: "login",
    collapse: [
      {
        name: "Login",
        key: "login",
        route: "/authentication/login",
      }
    ],
  },
  {
    name: "Sign Up",
    key: "register",
    collapse: [
      {
        name: "Register",
        key: "register",
        route: "/authentication/register",
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
        route: "pages/error/404",
      },
      {
        name: "Error 500",
        key: "error-500",
        route: "/pages/error/500",
      },
    ],
  },
];

export default pageRoutes;
