import { useEffect, useState } from "react";
import { useNotify } from "layouts/Notify";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox/index";
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";
import Calendar from "layouts/Calendar";
import OutlinedCounterCard from "layouts/Cards/CounterCards/OutlinedCounterCard";

import { calendarDateOptions, typeOptions } from "pages/finance/transactions/schemas/options";

import transactionService from "services/transaction/transactionService";
import dataCalendarUtil from "utils/dataCalendarUtil";
import { h } from "@fullcalendar/core/preact.js";

function TransactionCalendar() {

  const [ calendarData, setCalendarData ] = useState([]);
  const [ transactions, setTransactions ] = useState([]);
  const [ dateRange, setDateRange ] = useState(calendarDateOptions[0].value);
  const [ selectedType, setSelectedType ] = useState(typeOptions[0]);
  const [ totalIncomes, setTotalIncomes ] = useState(0);
  const [ totalExpenses, setTotalExpenses ] = useState(0);
  const [ saldo, setSaldo ] = useState(0);
  const { showSuccess, showError } = useNotify();
  const today = new Date();
  const [ currentMonth, setCurrentMonth] = useState(today.toISOString().slice(0, 7));

  const fetchTransactions = async (range) => {
    transactionService
        .getTransactions(range)
        .then((data) => {
          const transactionsData = dataCalendarUtil.transactionsCalendarData(data);
          setTransactions(transactionsData);
          setCalendarData(transactionsData);
          const result = summaryAmounts(transactionsData, currentMonth);
          setTotalIncomes(result.income);
          setTotalExpenses(result.expense);
          setSaldo(result.balance);
        })
        .catch((err) => {
          showError(err.message);
        });
  };

  useEffect(() => {
    fetchTransactions(dateRange);
  }, []);

  const summaryAmounts = (trList, month) => {
    return trList.reduce(
      (acc, t) => {
        if (t.transaction.type === "INCOME" && t.transaction.date.slice(0, 7) === month) acc.income += t.transaction.amount;
        if (t.transaction.type === "EXPENSE" && t.transaction.date.slice(0, 7) === month) acc.expense += t.transaction.amount;
        acc.balance = acc.income - acc.expense;
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  };

  const handleSelectDateChange = (option) => {
    if(option.value == dateRange) return;
    setDateRange(option.value);
    setSelectedType(typeOptions[0]);
    fetchTransactions(option.value);
  };

  const handleSelectTypeChange = (option) => {
    if(option.value == dateRange) return;
    setSelectedType(option);
    const filterTransactions = (option.value != "ALL") ? transactions.filter(c => c.transaction.type == option.value) : transactions;
    setCalendarData(filterTransactions);
  };

  const handleDateSet = (e) => {
    const month = e.view.getCurrentData().currentDate.toISOString().slice(0,7);
    if(month === currentMonth) return;
    setCurrentMonth(month);
    const result = summaryAmounts(transactions, month);
    setTotalIncomes(result.income);
    setTotalExpenses(result.expense);
    setSaldo(result.balance);
  }

  const handleEventClick = (e) => {
    const transaction = e.event.extendedProps.transaction;
    console.log("handleEventClick", e.event.extendedProps.transaction)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
          <SoftBox my={2}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  Kalendarz transakcji
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Przeglądaj swoje finanse w ujęciu dni, tygodni i miesięcy. <br/>
                  Dzięki kalendarzowi łatwo zobaczysz, kiedy najwięcej wydajesz, a kiedy wpływają Twoje przychody.
                </SoftTypography>
              </SoftBox>
              <Stack spacing={1} direction="row">
                <SoftButton variant="gradient" color="info" size="small">
                  + DODAJ <br/> TRANSAKCJĘ
                </SoftButton>
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
                  <SoftSelect defaultValue={calendarDateOptions[0]} options={calendarDateOptions} onChange={handleSelectDateChange} />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Rodzaj transakcji
                    </SoftTypography>
                  </SoftBox>
                  <SoftSelect value={selectedType} options={typeOptions} onChange={handleSelectTypeChange} />
                </Grid>
              </Grid>
            </SoftBox>
          </SoftBox>
          <Divider />
          <Calendar
              initialView="dayGridMonth"
              initialDate={today}
              events={calendarData}
              selectable
              datesSet={handleDateSet}
              eventClick={handleEventClick}
            />
          <Grid container spacing={3} mt={1} mb={3} pl={1} pr={1} justifyContent="center" >
            <Grid item xs={6} lg={3}>
              <OutlinedCounterCard count={totalIncomes} suffix="zł." title="Suma przychodów" />
            </Grid>
            <Grid item xs={6} lg={3}>
              <OutlinedCounterCard count={totalExpenses} suffix="zł." title="Suma wydatków" />
            </Grid>
            <Grid item xs={6} lg={3}>
              <OutlinedCounterCard count={saldo} suffix="zł." title="Saldo" />
            </Grid>
          </Grid>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
      );
}

export default TransactionCalendar;