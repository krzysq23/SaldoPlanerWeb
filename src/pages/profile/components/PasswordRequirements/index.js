// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function PasswordRequirements() {
  const passwordRequirements = [
    "Jeden znak specjalny",
    "Minimum 4 znaki",
    "Jedna cyfra",
    "Często je zmieniaj",
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <SoftBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1.25}>
        <SoftTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </SoftTypography>
      </SoftBox>
    );
  });

  return (
    <Card id="change-password">
      <SoftBox pt={2} px={2} lineHeight={1}>
        <SoftTypography variant="h6" fontWeight="medium">
          Wymagania dotyczące hasła
        </SoftTypography>
        <SoftTypography variant="button" fontWeight="regular" color="text">
          Aby utworzyć silne hasło, postępuj zgodnie z poniższą instrukcją:
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
          {renderPasswordRequirements}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default PasswordRequirements;
