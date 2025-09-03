
// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";
import SoftBadge from "components/SoftBadge";

// Custom styles for ComplexProjectCard
function FinancialGoalCard({ color = "dark", financialGoal, dropdown = false }) {

  const percentSaved = financialGoal?.targetAmount
      ? Math.round((financialGoal.savedAmount / financialGoal.targetAmount) * 100) : 0;
  const progressColor = percentSaved < 100 ? "info" : percentSaved == 100 ? "success" :  "error";
  const badgeColor = progressColor;
  const badgeLabel = percentSaved < 100 ? "W trakcie" : percentSaved == 100 ? "Osiągnięty" :  "Przekroczony";

  return (
    <Card>
      <SoftBox p={2} sx={{  minHeight: "200px" }}>
        <SoftBox display="flex" alignItems="center">
          <SoftBox ml={2} lineHeight={0}>
            <SoftBox mb={1} lineHeight={0}>
              <SoftTypography
                variant="h5"
                fontWeight="medium"
                color={color === "white" ? "dark" : "white"}
              >
                <SoftTypography variant="button" color="secondary" fontWeight="medium">
                  {financialGoal.name}
                </SoftTypography>
              </SoftTypography>
              <SoftTypography variant="h5" textTransform="capitalize" fontWeight="bold">
                {financialGoal.name}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          {dropdown && (
            <SoftTypography
              color="secondary"
              onClick={dropdown.action}
              sx={{
                ml: "auto",
                alignSelf: "flex-start",
                py: 1.25,
              }}
            >
              <Icon fontSize="default" sx={{ cursor: "pointer" }}>
                more_vert
              </Icon>
            </SoftTypography>
          )}
          {dropdown.menu}
        </SoftBox>
        <SoftBox m={2} lineHeight={1}>
          <SoftProgress variant="gradient" value={percentSaved < 100 ? percentSaved : 100 } color={progressColor} />
        </SoftBox>
        <SoftBox m={2} lineHeight={1}>
          <SoftTypography variant="h6" fontWeight="medium">
            {financialGoal.savedAmount} zł 
            <SoftTypography variant="button" fontWeight="regular" color="secondary">
                / {financialGoal.targetAmount} zł
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <Divider />
        <SoftBox display="flex" justifyContent="space-between" alignItems="center">
          <SoftTypography variant="button" fontWeight="regular">
            Do: {financialGoal.deadline}
          </SoftTypography>
          <SoftBadge color={badgeColor} badgeContent={badgeLabel} size="sm" container />
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
FinancialGoalCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  financialGoal: PropTypes.object.isRequired,
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
    }),
  ]),
};

export default FinancialGoalCard;
