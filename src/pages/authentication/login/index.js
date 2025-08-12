
import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

import { useNotify } from "layouts/Notify";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftSnackbar from "components/SoftSnackbar";

// Authentication layout components
import CoverLayout from "pages/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved9.jpg";

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
    <CoverLayout
      title="Logowanie do Saldo Planer"
      description="Wprowadź login i hasło aby się zalogować."
      image={curved9}
    >
      <SoftBox component="form" role="form" onSubmit={handleSubmit}>
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
    </CoverLayout>
  );
}

export default Login;
