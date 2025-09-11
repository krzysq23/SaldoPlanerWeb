class DataChartUtil {

  createTransactionsPieChartData(data) {

    return {
      labels: data.map(t => t.label),
      datasets: {
        label: "Kategoria",
        backgroundColors: data.map(t => t.color),
        data: data.map(t => t.percent),
      },
    };
  }

  createTransactionsLinearChartData(data) {

    return {
      labels: data.map(t => t.label),
      datasets: transactions.map((t) => ({
        label: t.label,
        color: t.color,
        data: t.data,
      })),
    };
  }
}

const dataChartUtil = new DataChartUtil();
export default dataChartUtil;