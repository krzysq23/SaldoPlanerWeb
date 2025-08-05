import React from "react";

import { useEffect } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import routes from "./config/routes";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "assets/theme";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController } from "context";

export default function App() {

  const isAuthenticated = localStorage.getItem("auth") === "true";
  const [controller, dispatch] = useSoftUIController();
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {!isAuthenticated ? (
          <>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/authentication/login" />} />
          </>
        ) : (
          <>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </ThemeProvider>

  );

}