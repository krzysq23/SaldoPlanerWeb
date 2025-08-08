import { Client } from "types";

class DataTableUtils {

  generateClientTableData = (clients: Client[]) => {
    return {
      columns: [
        { Header: "Id", accessor: "id", width: "25%" },
        { Header: "Imię i Nazwisko", accessor: "name", width: "30%" },
        { Header: "Login", accessor: "login", width: "20%" },
        { Header: "Email", accessor: "email", width: "10%" },
        { Header: "Role", accessor: "roles" },
      ],
      rows: clients.map((client) => ({
        id: client.id,
        name: client.userName,
        login: client.login,
        email: client.email,
        roles: client.roles.join(", "),
      })),
    };
  };

}

const dataTableUtils = new DataTableUtils();
export default dataTableUtils;