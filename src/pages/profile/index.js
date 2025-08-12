// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox/index";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import Header from "layouts/LayoutContainers/Header";
import Footer from "layouts/Footer";
import PlatformSettings from "./components/ProfileSettings";
import ProfileInfoCard from "layouts/Cards/InfoCards/ProfileInfoCard";
import ChangePassword from "./components/ChangePassword";
import PasswordRequirements from "./components/PasswordRequirements";

import authService from "services/auth/authService";

function Profile() {

  const user = authService.getCurrentUser();
  const userName = user?.userName ?? "";
  const login = user?.login ?? "";
  const email = user?.email ?? "";
  const roles = user?.roles ?? [];

  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={6}>
            <ProfileInfoCard
              title="Informacje profilowe"
              description=""
              info={{
                "Imię i nazwisko": userName,
                "email": email,
                "role": roles,
                "lokalizacja": "Polska",
              }}
              social={[]}
              action={{ route: "", tooltip: "Edytuj profil" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <PlatformSettings />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ChangePassword />
            </Grid>
            <Grid item xs={12} md={6}>
              <PasswordRequirements />
            </Grid>
          </Grid>
        </SoftBox>
      <Footer />
    </DashboardLayout>
      );
}

export default Profile;