const form = {
  formId: "transaction-form",
  formField: {
    transactionId: {
      name: "id",
      type: "text"
    },
    categoryId: {
      name: "categoryId",
      label: "Kategoria",
      type: "text"
    },
    userId: {
      name: "userId",
      type: "text"
    },
    amount: {
      name: "amount",
      label: "Kwota (Zł.)",
      type: "number",
      placeholder: "10.00",
      errorMsg: "Wprowadź poprawną wartość transakcji.",
    },
    date: {
      name: "date",
      label: "Data",
      type: "date",
      placeholder: "Wybierz datę",
      errorMsg: "Data jest wymagana.",
      errorMatchMsg: "Niepoprawny format daty (Y-m-d).",
    },
    description: {
      name: "description",
      label: "Opis",
      type: "text",
      placeholder: "Wprowadź opis",
      errorMsg: "Opis jest wymagany."
    }
  },
};

export default form;
