import { createContext, useContext, useState } from "react";
import SoftSnackbar from "components/SoftSnackbar";
import SoftBox from "components/SoftBox";
import PropTypes from "prop-types";

const NotifyContext = createContext(null);

export const useNotify = () => {
  return useContext(NotifyContext);
};

export const NotifyProvider = ({ children }) => {
  const [notify, setNotify] = useState({
    err_title: "Błąd",
    err_content: "",
    succ_title: "Informacja",
    succ_content: "",
  });

  const [errorSB, setErrorSB] = useState(false);
  const [successSB, setSuccessSB] = useState(false);

  const showError = (content, title = "Błąd") => {
    setNotify((prev) => ({ ...prev, err_title: title, err_content: content }));
    setErrorSB(true);
  };

  const showSuccess = (content, title = "Informacja") => {
    setNotify((prev) => ({ ...prev, succ_title: title, succ_content: content }));
    setSuccessSB(true);
  };

  const closeErrorSB = () => setErrorSB(false);
  const closeSuccessSB = () => setSuccessSB(false);

  return (
    <NotifyContext.Provider value={{ showError, showSuccess }}>
      {children}
      <SoftBox>
        <SoftSnackbar
          color="success"
          icon="check"
          title={notify.succ_title}
          content={notify.succ_content}
          open={successSB}
          onClose={closeSuccessSB}
          close={closeSuccessSB}
          bgWhite
        />
        <SoftSnackbar
          color="error"
          icon="warning"
          title={notify.err_title}
          content={notify.err_content}
          open={errorSB}
          onClose={closeErrorSB}
          close={closeErrorSB}
        />
      </SoftBox>
    </NotifyContext.Provider>
  );
};

NotifyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotifyProvider;