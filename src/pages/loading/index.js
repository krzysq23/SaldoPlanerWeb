import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import PageLayout from "layouts/LayoutContainers/PageLayout";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";

import { BarLoader } from "react-spinners";

function Loading() {
  const { d1, d3, d4, d5 } = typography;

  return (
    <PageLayout white>
      <SoftBox my={24} height="calc(100vh - 24rem)">
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Grid item sx={{ textAlign: "center" }}>
            <SoftTypography variant="h2" color="info" textGradient fontWeight="bold" mb={3}>
              Ładowanie…
            </SoftTypography>
            <BarLoader
              color="#2152FF"
              cssOverride={{
                borderRadius: '10px',
                background: 'linear-gradient(90deg,rgba(33, 82, 255, 1) 0%, rgba(33, 212, 253, 1) 50%)'
              }}
              height={9}
              width={200}
            />
          </Grid>          
        </Grid>
      </SoftBox>
    </PageLayout>
  );
}

export default Loading;
