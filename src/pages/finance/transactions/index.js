import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNotify } from "layouts/Notify";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";
import DataTable from "layouts/Tables/DataTable";

import { dateOptions, typeOptions } from "pages/finance/transactions/schemas/options";

function Transactions() {

  const [transactions, setTransactions] = useState({ columns: [], rows: [] });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card lineHeight={1} m={3}>
          <SoftBox my={2}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  Transakcje
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Przeglądaj, filtruj i dodawaj swoje transakcje finansowe.
                </SoftTypography>
              </SoftBox>
              <Stack spacing={1} direction="row">
                <Link to="/finance/transactions/form">
                  <SoftButton variant="gradient" color="info" size="small">
                    + DODAJ <br/> TRANSAKCJĘ
                  </SoftButton>
                </Link>
              </Stack>
            </SoftBox>
            <Divider />
            <SoftBox m={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={5}>
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Zakres dat
                    </SoftTypography>
                  </SoftBox>
                  <SoftSelect defaultValue={dateOptions[0]} options={dateOptions} />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Rodzaj transakcji
                    </SoftTypography>
                  </SoftBox>
                  <SoftSelect defaultValue={typeOptions[0]} options={typeOptions} />
                </Grid>
              </Grid>
            </SoftBox>
            <Divider />
            <DataTable table={transactions} canSearch />
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
      );
}

export default Transactions;