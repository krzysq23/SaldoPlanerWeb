import * as Yup from "yup";
import checkout from "./form";

const {
  formField: { categoryId, amountLimit, periodType, startDate, endDate },
} = checkout;

const validations = Yup.object().shape({
  [categoryId.name]: Yup.string().required(categoryId.errorMsg),
  [amountLimit.name]: Yup.number().required(amountLimit.errorMsg).moreThan(0, amountLimit.invalidMsg),
  [periodType.name]: Yup.string().required(periodType.errorMsg),
  [startDate.name]: Yup.string().required(startDate.errorMsg).typeError(startDate.errorMatchMsg).test(
      "start-before-end",
      startDate.errorStartBefore,
      function (value) {
        const { endDate } = this.parent;
        if (!value || !endDate) return true;
        return value < endDate;
      }
    ),
  [endDate.name]: Yup.string().required(endDate.errorMsg).typeError(endDate.errorMatchMsg)
});

export default validations;