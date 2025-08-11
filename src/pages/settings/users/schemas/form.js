const form = {
  formId: "new-user-form",
  formField: {
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
      errorMsg: "login jest wymagany.",
    },
    email: {
      name: "email",
      label: "email",
      type: "email",
      placeholder: "email",
    },
    password: {
      name: "password",
      label: "password",
      type: "password",
      placeholder: "******",
      errorMsg: "Password is required.",
      invalidMsg: "Your password should be more than 6 characters.",
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
