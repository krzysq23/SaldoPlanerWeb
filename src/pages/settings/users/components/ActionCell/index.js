import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function ActionCell({ user, removeUser, changePassword }) {

  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Link to="#" onClick={() => changePassword(user)}>
          <Tooltip title="Zmień hasło" placement="top">
            <Icon>password</Icon>
          </Tooltip>
        </Link>
      </SoftTypography>
      <SoftBox mx={2}>
        <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
          <Link to={`/user/edit/${user.id}`}>
            <Tooltip title="Edycja" placement="top">
              <Icon>edit</Icon>
            </Tooltip>
          </Link>
        </SoftTypography>
      </SoftBox>
      <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Link to="#" onClick={() => removeUser(user)}>
          <Tooltip title="Usuń" placement="top">
            <Icon>delete</Icon>
          </Tooltip>
        </Link>
      </SoftTypography>
    </SoftBox>
  );
}

ActionCell.propTypes = {
  user: PropTypes.object.isRequired,
  removeUser: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

export default ActionCell;