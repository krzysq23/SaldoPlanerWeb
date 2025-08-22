import ActionCellUser from "pages/settings/users/components/ActionCell";
import ActionCellCategory from "pages/finance/categories/components/ActionCell";

import SoftBadge from "components/SoftBadge";
import Icon from "@mui/material/Icon";

class DataTableUtils {

  generateClientTableData(users, removeUserHandler, changePasswordHandler) {

    return {
      columns: [
        { Header: "Id", accessor: "id", width: "10%" },
        { Header: "Imię i Nazwisko", accessor: "name", width: "30%" },
        { Header: "Login", accessor: "login", width: "20%" },
        { Header: "Email", accessor: "email", width: "10%" },
        { Header: "Role", accessor: "roles" },
        { Header: "action", accessor: "action" },
      ],
      rows: users.map((user) => ({
        id: user.id,
        name: user.userName,
        login: user.login,
        email: user.email,
        roles: user.roles.join(", "),
        action: <ActionCellUser user={user} removeUser={removeUserHandler} changePassword={changePasswordHandler}/>,
      })),
    };
  };

  generateCategoriesTableData(categories, removeHandler, editHandler) {

    const typeLabels = {
      INCOME: "Przychody",
      EXPENSE: "Rozchody",
    };

    return {
      columns: [
        { Header: "Nazwa", accessor: "name" },
        { Header: "Typ", accessor: "type" },
        { Header: "Kolor", accessor: "color", width: "10%" },
        { Header: "Ikona", accessor: "icon", width: "10%" },
        { Header: "action", accessor: "action", width: "10%" },
      ],
      rows: categories.map((category) => ({
        name: category.name,
        type: typeLabels[category.type] || category.type,
        color: (
          <SoftBadge
            variant="contained"
            color={category.color}
            size="md"
            badgeContent="&nbsp;&nbsp;&nbsp;&nbsp;"
            container
          />
        ),
        icon: (
          <Icon 
            fontSize="large" 
            className={"text-dark"}>{category.icon}
          </Icon> 
        ),
        action: <ActionCellCategory category={category} removeHandler={removeHandler} editHandler={editHandler}/>,
      })),
    };
  };

}

const dataTableUtils = new DataTableUtils();
export default dataTableUtils;