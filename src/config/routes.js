import SignInCover from "layouts/authentication/login";
import SignUpCover from "layouts/authentication/register";

// Soft UI Dashboard PRO React icons
import Document from "elements/Icons/Document";

const routes = [
  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Authentication",
    key: "authentication",
    icon: <Document size="12px" />,
    collapse: [
      {
        name: "Sign In",
        key: "sign-in",
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
        name: "Sign Up",
        key: "sign-up",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/register",
            component: <SignUpCover />,
          }
        ],
      },
    ]
  },
];

export default routes;
