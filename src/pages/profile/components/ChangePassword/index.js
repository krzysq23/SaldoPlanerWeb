import { useState } from "react";

import { useNotify } from "layouts/Notify";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Security page components
import FormField from "layouts/account/components/FormField";

import authService from "services/auth/authService";

function ChangePassword() {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const { showSuccess, showError } = useNotify();
  const user = authService.getCurrentUser();
  const login = user?.login ?? "";

  const validatePassword = (pwd) => {
    const minLength = pwd.length > 4;
    const hasNumber = /\d/.test(pwd);
    return minLength && hasNumber;
  };
  
  const handleChangePassword = (data) => {

    setSubmitting(true);
    if(oldPassword.length > 1 && validatePassword(newPassword) && validatePassword(confirmPassword)) {
      if(newPassword != confirmPassword) {
        showError("Hasła różnią się od siebie.")
        return;
      }
      setSubmitting(false);
      authService
        .changePassword({ login: login, oldPassword: oldPassword, password: newPassword })
        .then((data) => {
            setOldPassword("")
            setNewPassword("")
            setConfirmPassword("")
            showSuccess("Hasło zostało zmienione.")
        })
        .catch((err) => {
          showError(err.message)
        });
    } else {
      showError("Hasło jest nieprawidłowe.")
    }
  }; 

  return (
    <Card id="change-password">
      <SoftBox pt={2} px={2} lineHeight={1}>
        <SoftTypography variant="h6" fontWeight="medium">
          Zmiana hasła
        </SoftTypography>
        <SoftTypography variant="button" fontWeight="regular" color="text">
          Wypełnij poniższe pola.
        </SoftTypography>
      </SoftBox>
      <SoftBox component="form" id="passwordForm" p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              label="Obecne hasło"
              placeholder="Obecne hasło"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              inputProps={{ type: "password", autoComplete: "" }}
              error={oldPassword.length < 1 && isSubmitting}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              label="Nowe hasło"
              placeholder="Nowe hasło"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              inputProps={{ type: "password", autoComplete: "" }}
              error={!validatePassword(newPassword) && isSubmitting}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              label="Potwierdź nowe hasło"
              placeholder="Potwierdź nowe hasło"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              inputProps={{ type: "password", autoComplete: "" }}
              error={!validatePassword(confirmPassword) && isSubmitting}
            />
          </Grid>
        </Grid>
        <SoftBox mt={2}>
          <SoftButton onClick={handleChangePassword} variant="gradient" color="dark" fullWidth>
            Zmień hasło
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default ChangePassword;
