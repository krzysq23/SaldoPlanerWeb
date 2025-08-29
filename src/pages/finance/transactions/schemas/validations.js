import * as Yup from "yup";
import checkout from "./form";

const {
  formField: { categoryId, amount, date, description },
} = checkout;

const validations = Yup.object().shape({
  [categoryId.name]: Yup.string().required(categoryId.errorMsg),
  [amount.name]: Yup.string().required(amount.errorMsg),
  [date.name]: Yup.string().required(date.errorMsg).typeError(date.errorMatchMsg),
  [description.name]: Yup.string().required(description.errorMsg),
});

export default validations;