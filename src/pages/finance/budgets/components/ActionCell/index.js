import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function ActionCell({ budget, removeHandler }) {

  return (
    <SoftBox display="flex" alignItems="center">
      <SoftBox mx={2}>
        <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
          <Link to="/finance/budgets/form" state={{ budget }}>
            <Tooltip title="Edycja" placement="top">
              <Icon>edit</Icon>
            </Tooltip>
          </Link>
        </SoftTypography>
      </SoftBox>
      <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Link to="#" onClick={() => removeHandler(budget)}>
          <Tooltip title="Usuń" placement="top">
            <Icon>delete</Icon>
          </Tooltip>
        </Link>
      </SoftTypography>
    </SoftBox>
  );
}

ActionCell.propTypes = {
  budget: PropTypes.object.isRequired,
  removeHandler: PropTypes.func.isRequired
};

export default ActionCell;