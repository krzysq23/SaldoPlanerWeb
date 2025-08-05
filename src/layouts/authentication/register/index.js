
import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved11 from "assets/images/curved-images/curved11.jpg";

function Cover() {
  const [agreement, setAgreement] = useState(true);

  const handleSetAgremment = () => setAgreement(!agreement);

  return (
    <CoverLayout
      title="Rejestracja w Saldo Planer"
      description="Wprowadź swoje dany aby się zarejestrować"
      image={curved11}
      top={12}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2} lineHeight={1.25}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Nazwa
            </SoftTypography>
          </SoftBox>
          <SoftInput placeholder="Nazwa" />
        </SoftBox>
        <SoftBox mb={2} lineHeight={1.25}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Email" />
        </SoftBox>
        <SoftBox mb={2} lineHeight={1.25}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Hasło
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Hasło" />
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
          <SoftButton variant="gradient" color="info" fullWidth>
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
    </CoverLayout>
  );
}

export default Cover;
