import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  
  const navigate = useNavigate();
  const message = location.state?.message;

  useEffect(() => {
    const message_succes = localStorage.getItem("APP_NOTIFY_MESSAGE_SUCCESS");
    const message_error = localStorage.getItem("APP_NOTIFY_MESSAGE_ERROR");
    if (message_succes) {
      setNotify((prev) => ({
        ...prev,
        succ_content: message_succes,
      }));
      setSuccessSB(true);
      localStorage.removeItem("APP_NOTIFY_MESSAGE_SUCCESS");
    }
    if (message_error) {
      setNotify((prev) => ({
        ...prev,
        succ_content: message_error,
      }));
      setSuccessSB(true);
      localStorage.removeItem("APP_NOTIFY_MESSAGE_ERROR");
    }
  });

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
          dateTime=""
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
          dateTime=""
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