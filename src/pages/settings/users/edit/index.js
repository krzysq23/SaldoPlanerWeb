// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox/index";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";
import breakpoints from "assets/theme/base/breakpoints";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";

function EditUser() {

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
                Edycja użytkownika
              </SoftTypography>
            </SoftBox>
            </Grid>  

          </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
      );
}

export default EditUser;