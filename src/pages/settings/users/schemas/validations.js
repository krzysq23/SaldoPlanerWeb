import * as Yup from "yup";
import checkout from "./form";

const {
  formField: { userName, login, email, password, roles },
} = checkout;

const validations = Yup.object().shape({
    [userName.name]: Yup.string().required(userName.errorMsg),
    [login.name]: Yup.string().required(login.errorMsg),
    [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
    [password.name]: Yup.string().required(password.errorMsg).min(4, password.invalidMsg),
    [roles.name]: Yup.array().of(Yup.string().oneOf(["USER", "ADMIN"])).min(1, roles.errorMsg)
  })

export default validations;
