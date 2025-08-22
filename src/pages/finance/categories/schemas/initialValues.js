import checkout from "./form";

const {
  formField: {
    categoryId,
    userId,
    name,
    type,
    color,
    icon
  },
} = checkout;

const initialValues = {
  [categoryId.name]: "",
  [userId.name]: "",
  [name.name]: "",
  [type.name]: "",
  [color.name]: "",
  [icon.name]: ""
};

export default initialValues;
