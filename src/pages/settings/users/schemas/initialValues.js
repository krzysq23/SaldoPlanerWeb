import checkout from "./form";

const {
  formField: {
    id,
    userName,
    login,
    email,
    password,
    roles
  },
} = checkout;

const initialValues = {
  [id.name]: "",
  [userName.name]: "",
  [login.name]: "",
  [email.name]: "",
  [password.name]: "",
  [roles.name]: ["USER"]
};

export default initialValues;
