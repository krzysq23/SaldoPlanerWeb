import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import SignIn from "./layouts/authentication/login";

import routes from "./config/routes";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "assets/theme";


const isAuthenticated = localStorage.getItem("auth") === "true";

const getRoutes = (allRoutes) =>
  allRoutes.map((route) => {
    if (route.collapse) {
      return getRoutes(route.collapse);
    }

    if (route.route && route.component) {
      return <Route exact path={route.route} element={route.component} key={route.key} />;
    }

    return null;
  });

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/dashboards/default" />} />
          </>
        )}
      </Routes>
    </ThemeProvider>

  );

}