import ActionCell from "pages/settings/users/components/ActionCell";

class DataTableUtils {

  generateClientTableData(users, removeUserHandler) {

    console.log("generateClientTableData removeUserHandler : ", removeUserHandler);

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
        action: <ActionCell user={user} removeUser={removeUserHandler} />,
      })),
    };
  };

}

const dataTableUtils = new DataTableUtils();
export default dataTableUtils;