import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function ActionCell({ transaction, editClick, removeClick }) {

  return (
    <SoftBox display="flex" alignItems="center">
      <SoftBox mx={2}>
        <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
          <Link to="#" onClick={() => editClick(transaction)}>
            <Tooltip title="Edycja" placement="top">
              <Icon>edit</Icon>
            </Tooltip>
          </Link>
        </SoftTypography>
      </SoftBox>
      <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Link to="#" onClick={() => removeClick(transaction)}>
          <Tooltip title="Usuń" placement="top">
            <Icon>delete</Icon>
          </Tooltip>
        </Link>
      </SoftTypography>
    </SoftBox>
  );
}

ActionCell.propTypes = {
  transaction: PropTypes.object.isRequired,
  editClick: PropTypes.func.isRequired,
  removeClick: PropTypes.func.isRequired
};

export default ActionCell;