
import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

import { useNotify } from "layouts/Notify";

// @mui material components
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftSnackbar from "components/SoftSnackbar";

// Authentication layout components
import BasicLayout from "pages/authentication/components/BasicLayout";
import Socials from "pages/authentication/components/Socials";

// Images
import backgroundImage from "assets/images/background-image-3.png";

import authService from "services/auth/authService";

function Login() {

  const [rememberMe, setRememberMe] = useState(false);
  const { showSuccess, showError } = useNotify();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    authService
      .login({ login: login, password: password })
      .then((data) => {
        navigate("/dashboard");
      })
      .catch((err) => {
        showError(err.message);
      });

  };

  return (
    <BasicLayout
      title="Saldo Planer"
      description="Wprowadź login i hasło aby się zalogować."
      image={backgroundImage}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Zaloguj się
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <SoftBox component="form" role="form" p={3} onSubmit={handleSubmit}>
          <SoftBox mb={2} lineHeight={1.25}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Login
              </SoftTypography>
            </SoftBox>
            <SoftInput 
              name="login" 
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Login"
              required 
              />
          </SoftBox>
          <SoftBox mb={2} lineHeight={1.25}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Hasło
              </SoftTypography>
            </SoftBox>
            <SoftInput 
              name="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Hasło" 
              required
              />
          </SoftBox>
          <SoftBox display="flex" alignItems="center">
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <SoftTypography
              variant="button"
              fontWeight="regular"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;Zapamiętaj mnie
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={4} mb={1}>
            <SoftButton type="submit" variant="gradient" color="info" fullWidth>
              Zaloguj się
            </SoftButton>
          </SoftBox>
          <SoftBox mt={3} textAlign="center">
            <SoftTypography variant="button" color="text" fontWeight="regular">
              Nie masz jeszcze konta?{" "}
              <SoftTypography
                component={Link}
                to="/authentication/register"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Zarejestruj się
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default Login;
