import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "services/api";
import { token } from "services/token";
import { authState } from "services/auth/authState";
import authService from "services/auth/authService";

export const AuthContext = createContext({
  isAuthenticated: false,
  loading: true,
  user: null,
  setIsAuthenticated: () => {},
  setUser: () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authState.setIsAuthenticated = setIsAuthenticated;
    authState.setUser = setUser;
  }, [setIsAuthenticated, setUser]);
  
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(process.env.REACT_APP_STATUS_ENDPOINT);
        const newAccess = res.data?.accessToken;
        if (newAccess) {
          token.set(newAccess);
          setIsAuthenticated(true);
          setUser(authService.getCurrentUser());
        } else {
          token.clear();
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        token.clear();
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const logout = () => {
    token.clear();
    setIsAuthenticated(false);
    setUser(null);
    axios.post(process.env.REACT_APP_LOGOUT_ENDPOINT, {}, { withCredentials: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};