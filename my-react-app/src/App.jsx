import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Dashboard from "./components/pages/Dashboard";
import Users from "./components/pages/Users";
import Analytics from "./components/pages/Analytics";
import Settings from "./components/pages/Settings";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = () => {
  const [sidebarToggle, setSidebarToggle] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");

  // Auth state
  const [user, setUser] = useState(null); // null = logged out
  const [registeredUsers, setRegisteredUsers] = useState([
    { username: "admin", password: "admin123" },
  ]);
  const [authView, setAuthView] = useState("login"); // "login" or "register"

  // Toggle sidebar
  function toggleSidebar() {
    setSidebarToggle(!sidebarToggle);
  }

  // Menu click
  function handleMenuClick(page) {
    setActivePage(page);
  }

  // Handle login form submit
  function handleLogin(username, password) {
    const foundUser = registeredUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      setAuthView("app");
    } else {
      alert("Invalid username or password");
    }
  }

  // Handle register form submit
  function handleRegister(username, password) {
    if (registeredUsers.find((u) => u.username === username)) {
      alert("Username already exists");
      return false;
    }
    const newUser = { username, password };
    setRegisteredUsers([...registeredUsers, newUser]);
    alert("Registration successful! You can now login.");
    setAuthView("login");
    return true;
  }

  // Handle logout
  function handleLogout() {
    setUser(null);
    setAuthView("login");
  }

  // Render main app content
  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;
      case "Users":
        return <Users />;
      case "Analytics":
        return <Analytics />;
      case "Settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  // Render based on auth view
  if (!user) {
    return (
      <>
        {authView === "login" && (
          <Login
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthView("register")}
          />
        )}
        {authView === "register" && (
          <Register
            onRegister={handleRegister}
            onSwitchToLogin={() => setAuthView("login")}
          />
        )}
      </>
    );
  }

  // Render main app UI after login
  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 font-sans text-gray-900">
      <Sidebar
        status={sidebarToggle}
        activePage={activePage}
        onMenuClick={handleMenuClick}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onSidebarToggle={toggleSidebar} onLogout={handleLogout} user={user} />

        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;