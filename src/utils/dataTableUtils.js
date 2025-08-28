import ActionCellUser from "pages/settings/users/components/ActionCell";
import ActionCellCategory from "pages/finance/categories/components/ActionCell";

import SoftBadge from "components/SoftBadge";
import Icon from "@mui/material/Icon";

import { typeLabels } from "pages/finance/categories/schemas/options";

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

  generateCategoriesTableData(categories, removeHandler) {

    return {
      columns: [
        { Header: "Nazwa", accessor: "name" },
        { Header: "Typ", accessor: "type" },
        { Header: "Kolor", accessor: "color", width: "10%" },
        { Header: "Ikona", accessor: "icon", width: "10%" },
        { Header: "action", accessor: "action", width: "10%" },
      ],
      rows: categories.map((category) => ({
        id: category.id,
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
        action: <ActionCellCategory category={category} removeHandler={removeHandler}/>,
      })),
    };
  };

  generateTransactionsTableData(transactions, removeHandler) {

    return {
      columns: [
        { Header: "Data", accessor: "date" },
        { Header: "Opis", accessor: "description" },
        { Header: "Kategoria", accessor: "category" },
        { Header: "Kwota", accessor: "amount" },
        { Header: "action", accessor: "action", width: "10%" },
      ],
      rows: transactions.map((transaction) => ({
        id: transaction.id,
        date: transaction.date,
        description: transaction.description,
        category: typeLabels[transactions.type] || transactions.type,
        amount: transaction.amount,
        action: <ActionCellCategory transactions={transactions} removeHandler={removeHandler}/>,
      })),
    };
  };

}

const dataTableUtils = new DataTableUtils();
export default dataTableUtils;