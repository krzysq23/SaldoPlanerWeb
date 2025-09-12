import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "context/auth";
import App from "App";

import { SoftUIControllerProvider } from "context/index";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <SoftUIControllerProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SoftUIControllerProvider>
  </BrowserRouter>
);
