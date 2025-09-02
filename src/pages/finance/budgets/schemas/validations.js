import * as Yup from "yup";
import checkout from "./form";

const {
  formField: { categoryId, amountLimit, periodType, startDate, endDate },
} = checkout;

const validations = Yup.object().shape({
  [categoryId.name]: Yup.string().required(categoryId.errorMsg),
  [amountLimit.name]: Yup.number().required(amountLimit.errorMsg).moreThan(0, amountLimit.invalidMsg),
  [periodType.name]: Yup.string().required(periodType.errorMsg),
  [startDate.name]: Yup.string().required(startDate.errorMsg).typeError(startDate.errorMatchMsg)
});

export default validations;