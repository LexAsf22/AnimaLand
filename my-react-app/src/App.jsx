import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Layout Components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Dashboard from "./pages/Dashboard";
import Owner from "./pages/Owner";
import Employee from "./pages/Employee";
import Settings from "./pages/Settings";
import TreatmentRecords from "./pages/TreatmentRecords";
import Appointment from "./pages/Appointment";

// Auth
import AdminLogin from "./auth/AdminLogin";

// Context + Protected Route
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// ----------------- Page Titles -----------------
const pageTitles = {
  "/dashboard": "Dashboard - Vet Clinic System",
  "/users": "Owners - Vet Clinic System",
  "/employee": "Employees - Vet Clinic System",
  "/appointment": "Appointments - Vet Clinic System",
  "/treatment-records": "Treatment Records - Vet Clinic System",
  "/settings": "Settings - Vet Clinic System",
};

// ----------------- Title Updater -----------------
const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const title = pageTitles[location.pathname] || "Vet Clinic System";
    document.title = title;
  }, [location]);

  return null;
};

// ----------------- App Component -----------------
const App = () => {
  const { token, username, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <>
      <TitleUpdater />

      <div
        className={`flex h-screen ${
          token ? "bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100" : ""
        }`}
      >
        {/* ------------------- SIDEBAR ------------------- */}
        {token && <Sidebar status={sidebarOpen} />}

        {/* ------------------- MAIN LAYOUT ------------------- */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          {token && <Header onSidebarToggle={toggleSidebar} onLogout={logout} user={username} />}

          {/* Page Routing */}
          <main className={`flex-1 overflow-auto ${token ? "p-4" : ""}`}>
            <Routes>
              {/* Public Route: Login */}
              <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <AdminLogin />} />

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
                    <Owner />
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

              {/* Redirect root */}
              <Route path="/" element={<Navigate to="/dashboard" />} />

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>

          {/* Footer */}
          {token && <Footer />}
        </div>
      </div>
    </>
  );
};

export default App;
