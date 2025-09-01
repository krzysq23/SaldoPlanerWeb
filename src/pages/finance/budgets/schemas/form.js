const form = {
  formId: "budget-form",
  formField: {
    budgetId: {
      name: "id",
      type: "text"
    },
    userId: {
      name: "userId",
      type: "text"
    },
    categoryId: {
      name: "categoryId",
      label: "Kategoria",
      type: "text",
      placeholder: "Wybierz kategorię",
      errorMsg: "Kategoria jest wymagana.",
    },
    amountLimit: {
      name: "amountLimit",
      label: "Kwota budżetu (Zł.)",
      type: "number",
      placeholder: "1000",
      errorMsg: "Wprowadź poprawną wartość.",
    },
    periodType: {
      name: "periodType",
      label: "Zakres czasu",
      type: "text",
      placeholder: "Zakres czasu",
      errorMsg: "Wprowadź zakres czasu.",
    },
    startDate: {
      name: "startDate",
      label: "Data rozpoczęcia",
      type: "date",
      placeholder: "Wybierz datę",
      errorMsg: "Data jest wymagana.",
      errorMatchMsg: "Niepoprawny format daty (Y-m-d).",
    },
    endDate: {
      name: "endDate",
      label: "Data zakończenia",
      type: "date",
      placeholder: "Wybierz datę",
      errorMsg: "Data jest wymagana.",
      errorMatchMsg: "Niepoprawny format daty (Y-m-d).",
    }
  },
};

export default form;
