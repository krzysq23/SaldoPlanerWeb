import Default from "pages/dashboard";
import SignInCover from "pages/authentication/login";
import SignUpCover from "pages/authentication/register"
import Error404 from "pages/error/404";
import Error500 from "pages/error/500";

// Soft UI Dashboard PRO React icons
import Shop from "layouts/Icons/Shop";
import Document from "layouts/Icons/Document";

const routes = [
    {
      type: "collapse",
      name: "Panel",
      key: "dashboard",
      icon: <Shop size="12px" />,
      collapse: [
        {
          name: "Strona główna",
          key: "default",
          route: "/dashboard",
          component: <Default />,
        },
    ]
  },
  { type: "title", title: "Ustawienia", key: "title-settings" },
  {
    type: "collapse",
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
