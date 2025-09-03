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
import OutlinedCounterCard from "layouts/Cards/CounterCards/OutlinedCounterCard";

// sweetalert2 components
import Swal from "sweetalert2";

import { periodTypes } from "pages/finance/budgets/schemas/options";

import budgetService from "services/budget/budgetService";
import dataTableUtils from "utils/dataTableUtils";
import categoryStore from "services/category/categoryStore";

function Budgets() {

  const { showSuccess, showError } = useNotify();
  const [ periodTypeSelect, setPeriodTypeSelect ] = useState(periodTypes[0].value);
  const [ selectedCategory, setSelectedCategory ] = useState("");
  const [ tableData, setTableData ] = useState({ columns: [], rows: [] });
  const [ budgets, setBudgets ] = useState([]);
  const [ totalLimit, setTotalLimit ] = useState(0);
  const [ totalSpent, setTotalSpent ] = useState(0);
  const [ totalRemaining, setTotalRemaining ] = useState(0);

  const categoryOptions = categoryStore.getCategories().map((category) => ( 
    { value: category.id, label: category.name }
  ))

  const fetchBudgets = async () => {
    budgetService
          .getBudgets()
          .then((data) => {
            setTotalLimit(data.totalLimit);
            setTotalSpent(data.totalSpent);
            setTotalRemaining(data.totalRemaining);
            const tableData = dataTableUtils.generateBudgetsTableData(data.budgets, removeHandler);
            setTableData(tableData);
            setBudgets(tableData.rows);
          })
          .catch((err) => {
            showError(err.message);
          });
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const newSwal = Swal.mixin({
    customClass: {
      confirmButton: "button button-success",
      cancelButton: "button button-error",
    },
    buttonsStyling: false,
  });

  const removeHandler = (data) => {
    const categoryName = categoryStore.getCategories().find(c => c.id === data.categoryId).name;
    newSwal
      .fire({
        title: "Usuwanie budżetu",
        html: `Czy na pewno chcesz usunąć budżet<br><b>${categoryName}</b>?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "USUŃ",
        cancelButtonText: "ANULUJ",
      })
      .then((result) => {
        if (result.isConfirmed) {
          budgetService
            .removeBudget(data)
            .then((resp) => {
              Swal.fire("Sukces!", `Budżet został usunięty.`, "success");
              setBudgets(prev => prev.filter(transaction => transaction.id !== data.id));
              setTableData(prev => ({
                ...prev,
                rows: prev.rows.filter(transaction => transaction.id !== data.id)
              }));
            })
            .catch((err) => {
              Swal.fire("Błąd!", `Nie udało się usunąć budżetu`, "error");
            });
        }
      });
  }

  const handlePeriodTypesChange = (option) => {
    if(option.value == periodTypeSelect) return;
    setPeriodTypeSelect(option.value);
  };

  const handleCategoryChange = (option) => {
    setSelectedCategory(option);
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
                  Budżety
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Planuj swoje wydatki w poszczególnych kategoriach i kontroluj realizację budżetu..
                </SoftTypography>
              </SoftBox>
              <Stack spacing={1} direction="row">
                <Link to="/finance/budgets/form">
                  <SoftButton variant="gradient" color="info" size="small">
                    + DODAJ <br/> BUDŻET
                  </SoftButton>
                </Link>
              </Stack>
            </SoftBox>
            <Divider />
            <SoftBox m={3}>
              <Grid container spacing={3} pb={3}>
                <Grid item xs={12} lg={5}>
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Zakres czasu
                    </SoftTypography>
                  </SoftBox>
                  <SoftSelect options={periodTypes} placeholder="Wybierz zakres czasu" onChange={handlePeriodTypesChange} />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Kategorie
                    </SoftTypography>
                  </SoftBox>
                  <SoftSelect value={selectedCategory} options={categoryOptions} placeholder="Wybierz kategorię" onChange={handleCategoryChange} />
                </Grid>
              </Grid>
            </SoftBox>
            <Divider />
            <DataTable table={tableData} canSearch entriesPerPage={{ defaultValue: 15 }} />
            <Divider />
            <Grid container spacing={3} mt={1} mb={3} justifyContent="center" >
              <Grid item xs={6} lg={3}>
                <OutlinedCounterCard count={totalLimit} suffix="zł." title="Łączny budżet" />
              </Grid>
              <Grid item xs={6} lg={3}>
                <OutlinedCounterCard count={totalSpent} suffix="zł." title="Wydano" />
              </Grid>
              <Grid item xs={6} lg={3}>
                <OutlinedCounterCard count={totalRemaining} suffix="zł." title="Pozostało" />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
      );
}

export default Budgets;