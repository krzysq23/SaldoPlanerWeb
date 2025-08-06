import Default from "pages/dashboard";
import SignInCover from "pages/authentication/login";
import SignUpCover from "pages/authentication/register"

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
  { type: "title", title: "Ustawienia", key: "title-settings" }
];

export default routes;
