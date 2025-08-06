import { useState, useEffect } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import routes from "./routes/routes";

// Soft UI Dashboard PRO React example components
import Sidenav from "layouts/Sidenav";
import Configurator from "layouts/Configurator";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "assets/theme";

// Images
import brand from "assets/images/logo.png";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setMiniSidenav } from "context";

export default function App() {

  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  const isAuthenticated = localStorage.getItem('token') != null && localStorage.getItem('token').length > 10;

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
            {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Saldo Planer"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}
      {layout === "vr" && <Configurator />}
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