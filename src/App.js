import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import routes from "routes/routes";

// Soft UI Dashboard PRO React example components
import Sidenav from "layouts/Sidenav";
import Configurator from "layouts/Configurator";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "assets/theme";

// Images
import brand from "assets/images/app-logo.png";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setMiniSidenav } from "context/index";

// notify component
import NotifyProvider from "layouts/Notify";

import { useAuth } from "context/auth";
import { ProtectedRoute } from "routes/protectedRoute";

export default function App() {

  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  const { isAuthenticated, loading, user } = useAuth();
  const userRoles = useMemo(
    () => (user?.roles ?? []),
    [user]
  );

    // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const hasAccess = (itemRoles = []) => {

    if (itemRoles.length === 0 || itemRoles.includes("PUBLIC")) return true;

    if (isAuthenticated && (itemRoles.includes("ALL_USERS") || itemRoles.some((r) => userRoles.includes(r)))) {
      return true;
    }
    return false;
  };

  const accessRoutes = (allRoutes) =>
    allRoutes
      .map((r) =>
        r.collapse
          ? { ...r, collapse: accessRoutes(r.collapse) }
          : r
      )
      .filter((r) => (r.roles ? hasAccess(r.roles) : true));

  const getRoutes = (allRoutes) =>
    
    allRoutes.flatMap((route) => {
      if (route.collapse) {
        return hasAccess(route.roles) ? getRoutes(route.collapse) : [];
      }

      if (route.route && route.component) {

        const isAuthPage = route.route === "/authentication/login" || route.route === "/authentication/register";

        if (isAuthPage) {
          return (
            <Route
              key={route.key}
              path={route.route}
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  route.component
                )
              }
            />
          );
        }

        return (
          <Route
            key={route.key}
            path={route.route}
            element={<ProtectedRoute>{route.component}</ProtectedRoute>}
          />
        );
      }

      return [];
    });

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ padding: 24 }}>Ładowanie…</div>
      </ThemeProvider>
    );   
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Saldo Planer"
            routes={accessRoutes(routes)}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}
      {layout === "vr" && <Configurator />}

      <NotifyProvider>
        <Routes>
          {getRoutes(routes)}
          <Route
            path="*"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/authentication/login" replace />
              )
            }
          />
        </Routes>
      </NotifyProvider>
    </ThemeProvider>
  );

}