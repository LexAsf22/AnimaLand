import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Added Router and Routes

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Dashboard from "./components/pages/Dashboard";
import Users from "./components/pages/Users";
import Employee from "./components/pages/Employee";
import Settings from "./components/pages/Settings";
import TreatmentRecords from "./components/pages/TreatmentRecords";
import Appointment from "./components/pages/Appointment";

// Auth
import Login from "./components/auth/AdminLogin";
import Register from "./components/auth/Register";

// Auth context
import { useAuth } from './context/AuthContext.js'; // Import the Auth context
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute

const App = () => {
  const [sidebarToggle, setSidebarToggle] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");

  // Auth state
  const { user, setUser, token } = useAuth(); // Use context to get user and token

  const [authView, setAuthView] = useState("login");

  // Toggle sidebar
  function toggleSidebar() {
    setSidebarToggle(!sidebarToggle);
  }

  // Menu click
  function handleMenuClick(page) {
    setActivePage(page);
  }

  // Handle login
  function handleLogin(username, password) {
    // For the purpose of this example, we mock the login logic
    const foundUser = { username, password, token: "mockToken" }; // Mocked user

    if (foundUser) {
      setUser(foundUser);
      setAuthView("app");
    } else {
      alert("Invalid username or password");
    }
  }

  // Handle register
  function handleRegister(username, password) {
    alert("Registration successful!");
    setAuthView("login");
  }

  // Logout
  function handleLogout() {
    setUser(null);
    setAuthView("login");
  }

  // Render login/register
  if (!user) {
    return (
      <>
        {authView === "login" && (
          <Login onLogin={handleLogin} onSwitchToRegister={() => setAuthView("register")} />
        )}

        {authView === "register" && (
          <Register onRegister={handleRegister} onSwitchToLogin={() => setAuthView("login")} />
        )}
      </>
    );
  }

  return (
    <Router>
      <div className="flex h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 font-sans text-gray-900">
        <Sidebar
          status={sidebarToggle}
          activePage={activePage}
          onMenuClick={handleMenuClick}
        />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header
            onSidebarToggle={toggleSidebar}
            onLogout={handleLogout}
            user={user}
          />

          <main className="flex-1 overflow-auto">
            <Routes>
              {/* Define the routes */}
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register onRegister={handleRegister} />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employee"
                element={
                  <ProtectedRoute>
                    <Employee />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/appointment"
                element={
                  <ProtectedRoute>
                    <Appointment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/treatment-records"
                element={
                  <ProtectedRoute>
                    <TreatmentRecords />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              {/* Redirect to dashboard by default */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
