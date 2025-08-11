const form = {
  formId: "new-user-form",
  formField: {
    id: {
      name: "id",
      label: "id",
      type: "text"
    },
    userName: {
      name: "userName",
      label: "Imię i nazwisko",
      type: "text",
      placeholder: "Imię i nazwisko",
      errorMsg: "Imię i nazwisko jest wymagane.",
    },
    login: {
      name: "login",
      label: "Login",
      type: "text",
      placeholder: "login",
      errorMsg: "Login jest wymagany.",
    },
    email: {
      name: "email",
      label: "email",
      type: "email",
      placeholder: "email",
      errorMsg: "Podaj email.",
      invalidMsg: "Email jest nieprawidłowy.",
    },
    password: {
      name: "password",
      label: "password",
      type: "password",
      placeholder: "******",
      errorMsg: "Wprowadź hasło.",
      invalidMsg: "hasło musi mień przynajmniej 4 znaki.",
    },
    roles: {
      name: "roles",
      label: "role",
      type: "select",
      placeholder: "Wybierz rolę",
      errorMsg: "Rola jest wymagana.",
      invalidMsg: "Wybierz rolę użytkownika.",
    },
  },
};

export default form;
