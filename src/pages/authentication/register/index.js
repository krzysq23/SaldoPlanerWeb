import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftSnackbar from "components/SoftSnackbar";

// Authentication layout components
import CoverLayout from "pages/authentication/components/CoverLayout";

// Images
import curved11 from "assets/images/curved-images/curved11.jpg";

import authService from "services/auth/authService";

function Register() {

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
        setNotify((prev) => ({
            ...prev,
            content: "Musisz zaakceptować regulamin przed rejestracją",
          }));
          setErrorSB(true);
        return;
      }

      authService
        .register({ userName: name, login: login, email: email, password: password })
        .then((data) => {
          navigate("/authentication/login", {
            state: { message: "Możesz teraz się zalogować" },
          });
        })
        .catch((err) => {
          setNotify((prev) => ({
            ...prev,
            content: err.message,
          }));
          setErrorSB(true);
        });
  
    };

    const [errorSB, setErrorSB] = useState(false);
    const closeErrorSB = () => setErrorSB(false);
    const [notify, setNotify] = useState({
      title: "Błąd logowania",
      content: "Nie udało się zarejestrować",
    });
    
    const renderErrorSB = (
      <SoftSnackbar
          color="error"
          icon="warning"
          title={notify.title}
          content={notify.content}
          dateTime=""
          open={errorSB}
          onClose={closeErrorSB}
          close={closeErrorSB}
        />
    );

  return (
    <CoverLayout
      title="Rejestracja w Saldo Planer"
      description="Wprowadź swoje dany aby się zarejestrować"
      image={curved11}
      top={12}
    >
      <SoftBox component="form" role="form" onSubmit={handleSubmit}>
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
        {renderErrorSB}
      </SoftBox>
    </CoverLayout>
  );
}

export default Register;
