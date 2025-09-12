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

}

const dataChartUtil = new DataChartUtil();
export default dataChartUtil;