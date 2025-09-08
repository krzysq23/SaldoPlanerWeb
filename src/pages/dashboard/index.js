import { useEffect, useState } from "react";
import { useNotify } from "layouts/Notify";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox/index";
import SoftTypography from "components/SoftTypography";
import SoftBadgeDot from "components/SoftBadgeDot";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";
import MiniStatisticsCard from "layouts/Cards/StatisticsCards/MiniStatisticsCard";
import DataTable from "layouts/Tables/DataTable";
import PieChart from "layouts/Charts/PieChart";

import dashboardService from "services/dashboard/dashboardService";
import dataTableUtils from "utils/dataTableUtils";
import dataChartUtil from "utils/dataChartUtil";

function Default() {

  const [ balance, setBalance ] = useState(0);
  const [ totalIncome, setTotalIncome ] = useState(0);
  const [ totalExpense, setTotalExpense ] = useState(0);
  const [ tableData, setTableData ] = useState({ columns: [], rows: [] });
  const [ chartData, setChartData ] = useState([]);
  const [ chartDataGraph, setChartDataGraph ] = useState([]);
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox pt={5} pb={2}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <SoftBox mb={1}>
              <SoftTypography variant="h5">Dashboard</SoftTypography>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftTypography variant="body2" color="text">
                Dashboard to centrum Twoich finansów – w jednym miejscu zobaczysz saldo, przychody, wydatki i postępy w realizacji celów.
              </SoftTypography>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>

      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <MiniStatisticsCard
                title={{ text: "Saldo", fontWeight: "medium" }}
                count={balance + " zł"}
                percentage={{ color: "success", text: "+10%" }}
                icon={{ color: "dark", component: "account_balance_wallet" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MiniStatisticsCard
                title={{ text: "Przychody", fontWeight: "medium" }}
                count={totalIncome + " zł"}
                percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "dark", component: "trending_up" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MiniStatisticsCard
                title={{ text: "Wydatki", fontWeight: "medium" }}
                count={totalExpense + " zł"}
                percentage={{ color: "error", text: "-3%" }}
                icon={{ color: "dark", component: "trending_down" }}
              />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={12}>
                <Card>
                  <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                    <SoftTypography variant="h6">Dane z ostatniego miesiąca</SoftTypography>
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
          </Grid>
        </SoftBox>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <SoftBox pt={3} px={3}>
                <SoftTypography variant="h6" fontWeight="medium">
                  Ostatnie transakcje
                </SoftTypography>
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

export default Default;