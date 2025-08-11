import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useNotify } from "layouts/Notify";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox/index";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import DataTable from "layouts/Tables/DataTable";

// sweetalert2 components
import Swal from "sweetalert2";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";

import clientService from "services/admin/clientService";
import dataTableUtils from "utils/dataTableUtils";

function UserManager() {

  const { values } = breakpoints;
  const { showSuccess, showError } = useNotify();
  const [clients, setClients] = useState({ columns: [], rows: [] });

  useEffect(() => {

    const fetchClients = async () => {
      clientService
            .getClients()
            .then((data) => {
              setClients(dataTableUtils.generateClientTableData(data, removeUserHandler));
            })
            .catch((err) => {
              showError(err.message);
            });
    };

    fetchClients();
  }, []);

  const newSwal = Swal.mixin({
    customClass: {
      confirmButton: "button button-success",
      cancelButton: "button button-error",
    },
    buttonsStyling: false,
  });

  const removeUserHandler = (data) => {
    newSwal
      .fire({
        title: "Usuwanie użytkownika",
        html: `Czy na pewno chcesz usunąć użytkownika<br><b>${data.userName}</b>?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "USUŃ",
        cancelButtonText: "ANULUJ",
      })
      .then((result) => {
        if (result.isConfirmed) {
          clientService
            .removeClient(data.id)
            .then((resp) => {
              Swal.fire("Sukces!", `Użytkownik ${data.userName} został usunięty.`, "success");
              setClients(prev => ({
                ...prev,
                rows: prev.rows.filter(user => user.id !== data.id)
              }));
            })
            .catch((err) => {
              Swal.fire("Błąd!", `Nie udało się usunąć użytkownika ${data.userName}`, "error");
            });
        }
      });
  };

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
              Zarządzanie użytkownikami
            </SoftTypography>
          </SoftBox>
          </Grid>  
        </Grid>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SoftBox lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                Lista użytkowników
              </SoftTypography>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Zarządzaj użytkownikami swojej aplikacji.
              </SoftTypography>
            </SoftBox>
            <Stack spacing={1} direction="row">
              <Link to="/user/add">
                <SoftButton variant="gradient" color="info" size="small">
                  + NOWY <br/> UŻYTKOWNIK
                </SoftButton>
              </Link>
            </Stack>
          </SoftBox>
          <DataTable table={clients} canSearch removeUser={removeUserHandler} />
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
      );
}

export default UserManager;