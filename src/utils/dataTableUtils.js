import ActionCell from "pages/settings/users/components/ActionCell";

class DataTableUtils {

  generateClientTableData(clients) {
    return {
      columns: [
        { Header: "Id", accessor: "id", width: "10%" },
        { Header: "Imię i Nazwisko", accessor: "name", width: "30%" },
        { Header: "Login", accessor: "login", width: "20%" },
        { Header: "Email", accessor: "email", width: "10%" },
        { Header: "Role", accessor: "roles" },
        { Header: "action", accessor: "action" },
      ],
      rows: clients.map((client) => ({
        id: client.id,
        name: client.userName,
        login: client.login,
        email: client.email,
        roles: client.roles.join(", "),
        action: <ActionCell />,
      })),
    };
  };

}

const dataTableUtils = new DataTableUtils();
export default dataTableUtils;