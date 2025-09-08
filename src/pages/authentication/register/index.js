import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

import { useNotify } from "layouts/Notify";

// @mui material components
import Checkbox from "@mui/material/Checkbox";
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

function Register() {

  const { showSuccess, showError } = useNotify();
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(true);
  const navigate = useNavigate();

  const handleSetAgremment = () => setAgreement(!agreement);

    const handleSubmit = (e) => {
      e.preventDefault();
  
      if(!agreement) {
        showError("Musisz zaakceptować regulamin przed rejestracją");
        return;
      }

      authService
        .register({ userName: name, login: login, email: email, password: password })
        .then((data) => {
          localStorage.setItem("APP_NOTIFY_MESSAGE_SUCCESS", "Utworzono konto. Możesz teraz się zalogować.");
          navigate("/authentication/login");
        })
        .catch((err) => {
          showError(err.message);
        });
  
    };

  return (
    <BasicLayout
      title="Saldo Planer"
      description="Wprowadź swoje dany aby się zarejestrować"
      image={backgroundImage}
      top={12}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Zarejestruj się
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <SoftBox component="form" role="form" p={3} onSubmit={handleSubmit}>
          <SoftBox mb={2} lineHeight={1.25}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Imię i Nazwisko
              </SoftTypography>
            </SoftBox>
            <SoftInput 
              name="name" 
              placeholder="Imię i Nazwisko" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputProps={{
                minlength: 3,
                maxlength: 30,
                pattern:"[a-zA-Z0-9\s]+"
              }}
              required
              />
          </SoftBox>
          <SoftBox mb={2} lineHeight={1.25}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Login
              </SoftTypography>
            </SoftBox>
            <SoftInput 
              name="login" 
              placeholder="Login" 
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              inputProps={{
                minlength: 3,
                maxlength: 30,
                pattern:"[a-zA-Z0-9\s]+"
              }}
              required
              />
          </SoftBox>
          <SoftBox mb={2} lineHeight={1.25}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Email
              </SoftTypography>
            </SoftBox>
            <SoftInput 
              name="email" 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Hasło" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{
                minlength: 4,
                maxlength: 30
              }}
              required
              />
          </SoftBox>
          <SoftBox display="flex" alignItems="center">
            <Checkbox checked={agreement} onChange={handleSetAgremment} />
            <SoftTypography
              variant="button"
              fontWeight="regular"
              onClick={handleSetAgremment}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;Akceptuję&nbsp;
            </SoftTypography>
            <SoftTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
              Regulamin
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={4} mb={1}>
            <SoftButton type="submit" variant="gradient" color="info" fullWidth>
              Zarejestruj się
            </SoftButton>
          </SoftBox>
          <SoftBox mt={3} textAlign="center">
            <SoftTypography variant="button" color="text" fontWeight="regular">
              Masz już konto?&nbsp;
              <SoftTypography
                component={Link}
                to="/authentication/sign-in/cover"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Zaloguj się
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default Register;
