import * as Yup from "yup";
import checkout from "./form";

const {
  formField: { categoryId, name, targetAmount, savedAmount, deadline },
} = checkout;

const validations = Yup.object().shape({
  [categoryId.name]: Yup.string().required(categoryId.errorMsg),
  [name.name]: Yup.string().required(name.errorMsg),
  [targetAmount.name]: Yup.string().required(targetAmount.errorMsg),
  [savedAmount.name]: Yup.string().required(savedAmount.errorMsg),
  [deadline.name]: Yup.string().required(deadline.errorMsg).typeError(deadline.errorMatchMsg)
});

export default validations;