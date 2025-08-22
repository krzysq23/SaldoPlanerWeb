const form = {
  formId: "category-form",
  formField: {
    categoryId: {
      name: "id",
      type: "text"
    },
    userId: {
      name: "userId",
      type: "text"
    },
    name: {
      name: "name",
      label: "Nazwa",
      type: "text",
      placeholder: "Nazwa kategorii",
      errorMsg: "Podaj nazwę kategorii.",
    },
    type: {
      name: "type",
      label: "Typ kategorii",
      type: "select",
      placeholder: "Wybierz typ",
      errorMsg: "Podaj typ kategorii.",
    },
    color: {
      name: "color",
      label: "Kolor",
      type: "select",
      placeholder: "Wybierz kolor",
      errorMsg: "Wybierz kolor"
    },
    icon: {
      name: "icon",
      label: "Ikona",
      type: "select",
      placeholder: "Ikona",
      errorMsg: "Wybierz ikonę."
    },
  },
};

export default form;
