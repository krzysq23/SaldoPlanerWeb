import checkout from "./form";

const {
  formField: {
    userName,
    login,
    email,
    password,
    roles
  },
} = checkout;

const initialValues = {
  [userName.name]: "",
  [login.name]: "",
  [email.name]: "",
  [password.name]: "",
  [roles.name]: ["USER"]
};

export default initialValues;
