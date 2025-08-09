import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox/index";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";
import breakpoints from "assets/theme/base/breakpoints";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";

function AddUser() {

  const { values } = breakpoints;
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container>
          <Grid item xs={12} lg={7}>
            <SoftBox mb={3} p={1}>
              <SoftTypography
                variant={window.innerWidth < values.sm ? "h3" : "h2"}
                textTransform="capitalize"
                fontWeight="bold"
              >
                Tworzenie konta użytkownika
              </SoftTypography>
            </SoftBox>
            </Grid>  
          </Grid>
          <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={9}>
            <Card sx={{ overflow: "visible" }}>
              <SoftBox p={2} lineHeight={1}>
                <SoftTypography variant="h6" fontWeight="medium">
                  Nowy użytkownik
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Dodaj nowego użytkownika do systemu, wypełniając poniższe pola.
                </SoftTypography>
                <Divider />

                <SoftBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Imię i nazwisko
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput placeholder="Imię i nazwisko" />
                </SoftBox>

                <SoftBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SoftBox mb={1} ml={0.5} mt={2} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Login
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput placeholder="Login" />
                </SoftBox>

                <SoftBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SoftBox mb={1} ml={0.5} mt={2} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Email
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput placeholder="Email" />
                </SoftBox>

                <SoftBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SoftBox mb={1} ml={0.5} mt={2} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Hasło
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput variant="password" placeholder="Hasło" />
                </SoftBox>

                <SoftBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Role
                    </SoftTypography>
                  </SoftBox>
                  <SoftSelect
                    defaultValue={[
                      { value: "USER", label: "USER" },
                    ]}
                    options={[
                      { value: "USER", label: "USER" },
                      { value: "ADMIN", label: "ADMIN" },
                    ]}
                    isMulti
                  />
                </SoftBox>

                <SoftBox display="flex" justifyContent="flex-end" mt={3}>
                  <SoftBox mr={1}>
                    <Link to="/settings/users">
                      <SoftButton color="light">Anuluj</SoftButton>
                    </Link>
                  </SoftBox>
                  <SoftButton variant="gradient" color="info">
                    Dodaj użytkownika
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
      );
}

export default AddUser;