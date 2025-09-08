import { useState, useEffect } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import routes from "routes/routes";

// Soft UI Dashboard PRO React example components
import Sidenav from "layouts/Sidenav";
import Configurator from "layouts/Configurator";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "assets/theme";

// Images
import brand from "assets/images/logo.png";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setMiniSidenav } from "context/index";

// notify component
import NotifyProvider from "layouts/Notify";

import authService from "services/auth/authService";

export default function App() {

  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getRoles() || [];

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
    if (itemRoles.length === 0 || itemRoles.includes("PUBLIC")) {
      return true;
    } else if (isAuthenticated && (itemRoles.includes("ALL_USERS") || itemRoles.some(r => userRole.includes(r)))) {
      return true;
    } else {
      return false;
    }
  };

  const getRoutes = (allRoutes) => {
    return allRoutes.flatMap((route) => {
      
      if (route.collapse) {
        return hasAccess(route.roles) ? getRoutes(route.collapse, isAuthenticated) : null;
      }

      if (route.route && route.component) {

        const isAuthPage =
          route.route === "/authentication/login" ||
          route.route === "/authentication/register";

        if (isAuthenticated && isAuthPage) {
          return (
            <Route
              path={route.route}
              element={<Navigate to="/dashboard" replace />}
              key={route.key}
            />
          );
        }

        if (!isAuthenticated && !isAuthPage) {
          return (
            <Route
              path={route.route}
              element={<Navigate to="/authentication/login" replace />}
              key={route.key}
            />
          );
        }

        return <Route path={route.route} element={route.component} key={route.key} />;
      }

      return [];
    });
  };

  const accessRoutes = (allRoutes) => {
    return allRoutes.filter(r => r.roles ? hasAccess(r.roles) : true);
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
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/authentication/login"} />} />
        </Routes>
      </NotifyProvider>
    </ThemeProvider>

  );

}