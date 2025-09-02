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
      invalidMsg: "Limit musi być większy od 0.",
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
      label: "Okres rozpoczęcia",
      type: "month",
      placeholder: "Wybierz datę rozpoczęcia",
      errorMsg: "Data jest wymagana.",
      errorMatchMsg: "Niepoprawny format daty.",
    },
    note: {
      name: "note",
      label: "Notatka (Opcjonalnie)",
      type: "text",
      placeholder: "Notatka...",
    }
  },
};

export default form;
