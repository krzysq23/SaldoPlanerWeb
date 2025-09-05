import ActionCellUser from "pages/settings/users/components/ActionCell";
import ActionCellCategory from "pages/finance/categories/components/ActionCell";
import ActionCellTransaction from "pages/finance/transactions/components/ActionCell";
import ActionCellBudget from "pages/finance/budgets/components/ActionCell";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";
import SoftButton from "components/SoftButton";

import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

import { typeLabels } from "pages/finance/categories/schemas/options";

import categoryStore from "services/category/categoryStore";

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
          <SoftBox
            color={category.color}
            bgColor={category.color}
            variant="contained"
            borderRadius="lg"
            shadow="lg"
            p={1}
          >&nbsp;&nbsp;&nbsp;&nbsp;</SoftBox>
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

  generateTransactionsTableData(transactions, editHandler, removeHandler) {

    const categories = categoryStore.getCategories()
    return {
      columns: [
        { Header: "Data", accessor: "date" },
        { Header: "Opis", accessor: "description" },
        { Header: "Kategoria", accessor: "category" },
        { Header: "Kwota (zł.)", accessor: "amount" },
        { Header: "action", accessor: "action", width: "10%" },
      ],
      rows: transactions.map((transaction) => {
        const category = categories.find(c => c.id === transaction.categoryId);
        return {
          id: transaction.id,
          type: category?.type,
          date: transaction.date,
          description: transaction.description,
          category: category?.name,
          amount: category?.type == "INCOME" 
                    ? <SoftTypography variant="inherit" color="success"> + {transaction.amount} zł.</SoftTypography>
                    : <SoftTypography variant="inherit" color="error"> - {transaction.amount} zł.</SoftTypography>,
          action: <ActionCellTransaction transaction={transaction} editClick={editHandler} removeClick={removeHandler}/>,
        };
      }),
    };
  };

  generateDashboardTransactionsTableData(transactions) {

    const categories = categoryStore.getCategories()
    return {
      columns: [
        { Header: "Data", accessor: "date" },
        { Header: "Opis", accessor: "description" },
        { Header: "Kategoria", accessor: "category" },
        { Header: "Kwota (zł.)", accessor: "amount" }
      ],
      rows: transactions.map((transaction) => {
        const category = categories.find(c => c.id === transaction.categoryId);
        return {
          id: transaction.id,
          type: category?.type,
          date: transaction.date,
          description: transaction.description,
          category: category?.name,
          amount: category?.type == "INCOME" 
                    ? <SoftTypography variant="inherit" color="success"> + {transaction.amount} zł.</SoftTypography>
                    : <SoftTypography variant="inherit" color="error"> - {transaction.amount} zł.</SoftTypography>
        };
      }),
    };
  };

  generateBudgetsTableData(budgets, removeHandler) {

    const categories = categoryStore.getCategories()
    return {
      columns: [
        { Header: "Kategoria", accessor: "category" },
        { Header: "Kwota budżetu", accessor: "amountLimit" },
        { Header: "Wydane", accessor: "amountSpent" },
        { Header: "Pozostało", accessor: "amountRemaining" },
        { Header: "Progress", accessor: "progress" },
        { Header: "action", accessor: "action", width: "10%" }
      ],
      rows: budgets.map((budget) => {
        const category = categories.find(c => c.id === budget.categoryId);
        const categoryRow = ( budget.note ?
          <SoftBox space={2}>
            {category?.name}
            <Tooltip title={budget.note} placement="right" arrow>
              <SoftButton variant="outlined" color="secondary" size="small" circular iconOnly sx={{ ml: 1 }} >
                <Icon>info</Icon>
              </SoftButton>
            </Tooltip>
          </SoftBox>
        : category?.name)
        const progress = (<SoftBox width="8rem">
              <SoftProgress variant="gradient" 
                value={budget.percentSpent} 
                color={budget.status == "OK" ? "success" : budget.status == "NEAR_LIMIT" ? "warning" : "error"} />
            </SoftBox>
        );
        return {
          id: budget.id,
          category: categoryRow,
          amountLimit: budget.amountLimit + " zł",
          amountSpent: budget.amountSpent,
          amountRemaining: budget.amountRemaining,
          progress: progress,
          action: <ActionCellBudget budget={budget} removeHandler={removeHandler}/>,
        };
      }),
    };
  };

}

const dataTableUtils = new DataTableUtils();
export default dataTableUtils;