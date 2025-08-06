import Default from "layouts/dashboard";
import SignInCover from "layouts/authentication/login";
import SignUpCover from "layouts/authentication/register"

// Soft UI Dashboard PRO React icons
import Shop from "elements/Icons/Shop";
import Document from "elements/Icons/Document";

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
