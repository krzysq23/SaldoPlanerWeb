import { useEffect, useState } from "react";
import { useNotify } from "layouts/Notify";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";
import SoftButton from "components/SoftButton";
import SoftDatePicker from "components/SoftDatePicker";
import SoftBadgeDot from "components/SoftBadgeDot";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";
import OutlinedCounterCard from "layouts/Cards/CounterCards/OutlinedCounterCard";
import DataTable from "layouts/Tables/DataTable";
import PieChart from "layouts/Charts/PieChart";
import DefaultLineChart from "layouts/Charts/LineCharts/DefaultLineChart";

import { calendarDateOptions, typeOptions } from "pages/finance/transactions/schemas/options";
import categoryStore from "services/category/categoryStore";

import dashboardService from "services/dashboard/dashboardService";
import dataTableUtils from "utils/dataTableUtils";
import dataChartUtil from "utils/dataChartUtil";

function Reports() {

  const categoryOptions = categoryStore.getCategories().map((category) => ( 
    { value: category.id, label: category.name }
  ))
  categoryOptions.unshift({ value: "ALL", label: "Wszystkie" })

  const [ startDate, setStartDate ] = useState(new Date());
  const [ endDate, setEndDate ] = useState(new Date());
  const [ selectedCategory, setSelectedCategory ] = useState(categoryOptions[0]);
  const [ selectedType, setSelectedType ] = useState(typeOptions[0]);
  const [ tableData, setTableData ] = useState({ columns: [], rows: [] });
  const [ chartData, setChartData ] = useState([]);
  const [ chartDataGraph, setChartDataGraph ] = useState([]);
  const [ totalIncomes, setTotalIncome ] = useState(0);
  const [ totalExpenses, setTotalExpense ] = useState(0);
  const [ balance, setBalance ] = useState(0);
  const { showSuccess, showError } = useNotify();

  useEffect(() => {
    dashboardService
        .getInfo()
        .then((data) => {
          setBalance(data.balance);
          setTotalIncome(data.totalIncome);
          setTotalExpense(data.totalExpense);
          setTableData(dataTableUtils.generateDashboardTransactionsTableData(data.transactions));
          setChartData(data.chartData);
          setChartDataGraph(dataChartUtil.createTransactionsChartData(data.chartData));
        })
        .catch((err) => {
          showError(err.message);
        });
  }, []);

  const handleSetStartDate = (selectedDates) => {
    setStartDate(selectedDates[0]);
  };

  const handleSetEndDate = (selectedDates) => {
    setEndDate(selectedDates[0]);
  };

  const handleSelectCategoryChange = (option) => {
    setSelectedCategory(option);
  };

  const handleSelectTypeChange = (option) => {
    setSelectedType(option);
  };

  const filterRaportClick = () => { 
    console.log("filterRaportClick");
  }

  const generatePDFRaportClick = () => { 
    console.log("generatePDFRaportClick");
  }

  const generateCSVRaportClick = () => { 
    console.log("generateCSVRaportClick");
  }

  const defaultLineChartData = {
  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Przychody",
      color: "info",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
    {
      label: "Wydatki",
      color: "dark",
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
    }
  ],
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
                  Raporty
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Zobacz podsumowania przychodów i wydatków, sprawdź trendy w czasie i analizuj strukturę kosztów. 
                  Dzięki przejrzystym wykresom i szczegółowym tabelom łatwo zrozumiesz, gdzie trafiają Twoje pieniądze i jak planować kolejne miesiące.
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <Divider />
            <SoftBox m={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Data od
                    </SoftTypography>
                  </SoftBox>
                  <SoftDatePicker value={startDate} onChange={handleSetStartDate} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Data do
                    </SoftTypography>
                  </SoftBox>
                  <SoftDatePicker value={endDate} onChange={handleSetEndDate} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Kategorie
                    </SoftTypography>
                  </SoftBox>
                  <SoftSelect value={selectedCategory} options={categoryOptions} onChange={handleSelectCategoryChange} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Rodzaj transakcji
                    </SoftTypography>
                  </SoftBox>
                  <SoftSelect value={selectedType} options={typeOptions} onChange={handleSelectTypeChange} />
                </Grid>
              </Grid>
            </SoftBox>
            <SoftBox mt={5} mb={2}>
              <Grid container justifyContent="center">
                <Grid item xs={12} lg={3}>
                  <SoftButton variant="gradient" color="info" fullWidth onClick={filterRaportClick}>
                    Filtruj raport
                  </SoftButton>
                </Grid>
              </Grid>
            </SoftBox>
          </SoftBox>
          <Divider />
          <Grid container spacing={3} mt={1} mb={3} pl={1} pr={1} justifyContent="center" >
            <Grid item xs={6} lg={3}>
              <OutlinedCounterCard count={totalIncomes} suffix="zł." title="Suma przychodów" />
            </Grid>
            <Grid item xs={6} lg={3}>
              <OutlinedCounterCard count={totalExpenses} suffix="zł." title="Suma wydatków" />
            </Grid>
            <Grid item xs={6} lg={3}>
              <OutlinedCounterCard count={balance} suffix="zł." title="Saldo" />
            </Grid>
          </Grid>
        </Card>
      </SoftBox>
      <SoftBox mb={3}>
        <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} sm={6} lg={6} sx={{ display: "flex" }}>
              <Card>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                  <SoftTypography variant="h6">Wydatki wedłóg kategorii</SoftTypography>
                </SoftBox>
                <SoftBox p={2} mt={3} mb={3}>
                  <Grid container alignItems="center">
                    <Grid item xs={7}>
                      <PieChart chart={chartDataGraph} height="100%" />
                    </Grid>
                    <Grid item xs={5}>
                      <SoftBox px={1}>
                        {chartData.map((data) => (
                          <SoftBox mb={0.5} key={data.categoryName}>
                            <SoftBadgeDot color={data.color} size="sm" badgeContent={data.categoryName} />
                          </SoftBox>
                        ))}
                      </SoftBox>
                    </Grid>
                  </Grid>
                </SoftBox>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={6} sx={{ display: "flex" }}>
              <DefaultLineChart title="Trend przychodów i wydatków" chart={defaultLineChartData} />
            </Grid>
        </Grid>
      </SoftBox>
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                <SoftBox lineHeight={1}>
                  <SoftTypography variant="h5" fontWeight="medium">
                    Transakcje
                  </SoftTypography>
                </SoftBox>
                <Stack spacing={1} direction="row">
                  <SoftButton variant="outlined" color="error" onClick={generatePDFRaportClick}>
                    <Icon>description</Icon>
                    &nbsp;export pdf
                  </SoftButton>
                  <SoftButton variant="outlined" color="success" onClick={generateCSVRaportClick}>
                    <Icon>description</Icon>
                     &nbsp;export csv
                  </SoftButton>
                </Stack>
              </SoftBox>
              <SoftBox pt={3} pb={5} px={1}>
                <DataTable
                  table={tableData}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  isSorted={false}
                  noEndBorder
                />
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
      );
}

export default Reports;