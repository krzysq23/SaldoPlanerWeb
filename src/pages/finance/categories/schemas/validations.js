import * as Yup from "yup";
import checkout from "./form";

const {
  formField: { name, type, color, icon },
} = checkout;

const validations = Yup.object().shape({
  [name.name]: Yup.string().required(name.errorMsg),
  [type.name]: Yup.string().required(type.errorMsg),
  [color.name]: Yup.string().required(color.errorMsg),
  [icon.name]: Yup.string().required(icon.errorMsg),
});

export default validations;