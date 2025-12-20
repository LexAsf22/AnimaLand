
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = (tokenValue, usernameValue, roleValue) => {
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("username", usernameValue);
    localStorage.setItem("role", roleValue);

    setToken(tokenValue);
    setUsername(usernameValue);
    setRole(roleValue);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    setToken(null);
    setUsername("");
    setRole("");

    navigate("/", { replace: true }); // Redirect to LandingPage
  };

  return (
    <AuthContext.Provider value={{ token, username, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
