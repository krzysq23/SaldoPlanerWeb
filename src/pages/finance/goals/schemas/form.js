const form = {
  formId: "financial-goal-form",
  formField: {
    financialGoal: {
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
    name: {
      name: "name",
      label: "Opis",
      type: "text",
      placeholder: "Wprowadź opis",
      errorMsg: "Opis jest wymagany."
    },
    targetAmount: {
      name: "targetAmount",
      label: "Kwota docelowa",
      type: "number",
      placeholder: "100",
      errorMsg: "Wprowadź poprawną wartość transakcji.",
    },
    savedAmount: {
      name: "savedAmount",
      label: "Kwota odłożona",
      type: "number",
      placeholder: "0",
      errorMsg: "Wprowadź poprawną wartość transakcji.",
    },
    deadline: {
      name: "deadline",
      label: "Deadline",
      type: "date",
      placeholder: "Wybierz deadline",
      errorMsg: "Deadline jest wymagany.",
      errorMatchMsg: "Niepoprawny format daty (Y-m-d).",
    }
  },
};

export default form;
