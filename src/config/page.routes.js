// Soft UI Dashboard PRO React icons
import Shop from "elements/Icons/Shop";
import Office from "elements/Icons/Office";
import Document from "elements/Icons/Document";
import CustomerSupport from "elements/Icons/CustomerSupport";
import Cube from "elements/Icons/Cube";
import SpaceShip from "elements/Icons/SpaceShip";

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
  }
];

export default pageRoutes;
