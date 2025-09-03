class DataCalendarUtil {

  transactionsCalendarData(transactions) {

    return transactions.map((transaction) => ({
      title: transaction.description,
      start: transaction.date,
      end: transaction.date,
      className: transaction.type == "INCOME" ? "success" : "warning",
      transaction: transaction
    }));
  };

}

const datataCalendarUtil = new DataCalendarUtil();
export default datataCalendarUtil;