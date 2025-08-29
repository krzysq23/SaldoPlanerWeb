import { useEffect, useState, useRef } from "react";
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

// sweetalert2 components
import Swal from "sweetalert2";

import { dateOptions, typeOptions } from "pages/finance/transactions/schemas/options";

import transactionService from "services/transaction/transactionService";
import dataTableUtils from "utils/dataTableUtils";

function Transactions() {

  const { showSuccess, showError } = useNotify();
  const [transactions, setTransactions] = useState({ columns: [], rows: [] });

  useEffect(() => {
    const fetchTransactions = async () => {
      transactionService
            .getTransactions(dateOptions[0].value)
            .then((data) => {
              const tableData = dataTableUtils.generateTransactionsTableData(data, removeHandler);
              setTransactions(tableData);
            })
            .catch((err) => {
              showError(err.message);
            });
    };
    fetchTransactions();
  }, []);

  const newSwal = Swal.mixin({
    customClass: {
      confirmButton: "button button-success",
      cancelButton: "button button-error",
    },
    buttonsStyling: false,
  });

  const removeHandler = (data) => {
    newSwal
      .fire({
        title: "Usuwanie kategori",
        html: `Czy na pewno chcesz usunąć transakcję<br><b>${data.description}</b>?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "USUŃ",
        cancelButtonText: "ANULUJ",
      })
      .then((result) => {
        if (result.isConfirmed) {
          transactionService
            .removeTransaction(data)
            .then((resp) => {
              Swal.fire("Sukces!", `Transakcja ${data.description} została usunięta.`, "success");
              setTransactions(prev => ({
                ...prev,
                rows: prev.rows.filter(transaction => transaction.id !== data.id)
              }));
            })
            .catch((err) => {
              Swal.fire("Błąd!", `Nie udało się usunąć Transakcji: ${data.description}`, "error");
            });
        }
      });
  }

  const handleSelectDateChange = (option) => {
    console.log(option)
  };

  const handleSelectTypeChange = (option) => {
    console.log(option)
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
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
                  <SoftSelect defaultValue={dateOptions[0]} options={dateOptions} onChange={handleSelectDateChange} />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Rodzaj transakcji
                    </SoftTypography>
                  </SoftBox>
                  <SoftSelect defaultValue={typeOptions[0]} options={typeOptions} onChange={handleSelectTypeChange} />
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