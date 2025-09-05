class DataChartUtil {

  createTransactionsChartData(transactions) {

    return {
      labels: transactions.map(t => t.categoryName),
      datasets: {
        label: "Kategoria",
        backgroundColors: transactions.map(t => t.color),
        data: transactions.map(t => t.percent),
      },
    };
  }

}

const dataChartUtil = new DataChartUtil();
export default dataChartUtil;