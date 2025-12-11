// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

// Create context without default functions (simpler for Fast Refresh)
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const storedUsername = localStorage.getItem("username");
      const storedRole = localStorage.getItem("role");

      setToken(storedToken);
      setUsername(storedUsername);
      setRole(storedRole);

      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const login = (newToken, newUsername, newRole) => {
    setToken(newToken);
    setUsername(newUsername);
    setRole(newRole);

    localStorage.setItem("token", newToken);
    localStorage.setItem("username", newUsername);
    localStorage.setItem("role", newRole);

    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setRole(null);

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ token, username, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Simple top-level named export
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
