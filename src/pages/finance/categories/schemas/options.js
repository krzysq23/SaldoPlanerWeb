import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import Icon from "@mui/material/Icon";

export const typeLabels = {
    INCOME: "Przychody",
    EXPENSE: "Wydatki",
};

export const typeOptions = [
  { value: "INCOME", label: <SoftTypography variant="h6" fontWeight="regular">Przychody</SoftTypography> },
  { value: "EXPENSE", label: <SoftTypography variant="h6" fontWeight="regular">Wydatki</SoftTypography> }
]

export const colorOptions = [
  { value: "success", label: <SoftBadge variant="contained" color="success" size="md" badgeContent="&nbsp;&nbsp;&nbsp;&nbsp;" container /> },
  { value: "primary", label: <SoftBadge variant="contained" color="primary" size="md" badgeContent="&nbsp;&nbsp;&nbsp;&nbsp;" container /> },
  { value: "secondary", label: <SoftBadge variant="contained" color="secondary" size="md" badgeContent="&nbsp;&nbsp;&nbsp;&nbsp;" container /> },
  { value: "info", label: <SoftBadge variant="contained" color="info" size="md" badgeContent="&nbsp;&nbsp;&nbsp;&nbsp;" container /> },
  { value: "warning", label: <SoftBadge variant="contained" color="warning" size="md" badgeContent="&nbsp;&nbsp;&nbsp;&nbsp;" container /> },
  { value: "error", label: <SoftBadge variant="contained" color="error" size="md" badgeContent="&nbsp;&nbsp;&nbsp;&nbsp;" container /> },
  { value: "dark", label: <SoftBadge variant="contained" color="dark" size="md" badgeContent="&nbsp;&nbsp;&nbsp;&nbsp;" container /> },
]
export const iconOptions = [
  { value: "home", label: <Icon fontSize="large" className={"text-dark"}>home</Icon> },
  { value: "restaurant", label: <Icon fontSize="large" className={"text-dark"}>restaurant</Icon> },
  { value: "directions_car", label: <Icon fontSize="large" className={"text-dark"}>directions_car</Icon> },
  { value: "medical_information", label: <Icon fontSize="large" className={"text-dark"}>medical_information</Icon> },
  { value: "fitness_center", label: <Icon fontSize="large" className={"text-dark"}>fitness_center</Icon> },
  { value: "school", label: <Icon fontSize="large" className={"text-dark"}>school</Icon> },
  { value: "sailing", label: <Icon fontSize="large" className={"text-dark"}>sailing</Icon> },
  { value: "checkroom", label: <Icon fontSize="large" className={"text-dark"}>checkroom</Icon> },
  { value: "luggage", label: <Icon fontSize="large" className={"text-dark"}>luggage</Icon> },
  { value: "attach_money", label: <Icon fontSize="large" className={"text-dark"}>attach_money</Icon> },
  { value: "shopping_cart", label: <Icon fontSize="large" className={"text-dark"}>shopping_cart</Icon> },
  { value: "savings", label: <Icon fontSize="large" className={"text-dark"}>savings</Icon> },
  { value: "account_balance", label: <Icon fontSize="large" className={"text-dark"}>account_balance</Icon> },
  { value: "storefront", label: <Icon fontSize="large" className={"text-dark"}>storefront</Icon> },
  { value: "account_balance_wallet", label: <Icon fontSize="large" className={"text-dark"}>account_balance_wallet</Icon> },
  { value: "sell", label: <Icon fontSize="large" className={"text-dark"}>sell</Icon> },
  { value: "card_giftcard", label: <Icon fontSize="large" className={"text-dark"}>card_giftcard</Icon> },
]