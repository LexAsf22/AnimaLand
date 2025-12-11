import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Dashboard from "./pages/Dashboard";
import Owner from "./pages/Owner";
import Employee from "./pages/Employee";
import TreatmentRecords from "./pages/TreatmentRecords";
import Appointment from "./pages/Appointment";
import Pets from "./pages/Pets"; 

import AdminLogin from "./auth/AdminLogin";

import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// ----------------- Page Titles -----------------
const pageTitles = {
  "/dashboard": "Dashboard - Vet Clinic System",
  "/users": "Owners - Vet Clinic System",
  "/employee": "Employees - Vet Clinic System",
  "/pets": "Pets - Vet Clinic System",
  "/appointment": "Appointments - Vet Clinic System",
  "/treatment-records": "Treatment Records - Vet Clinic System",
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
        {token && <Sidebar status={sidebarOpen} />}

        <div className="flex flex-col flex-1 overflow-hidden">
          {token && <Header onSidebarToggle={toggleSidebar} onLogout={logout} user={username} />}

          <main className={`flex-1 overflow-auto ${token ? "p-4" : ""}`}>
            <Routes>
              <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <AdminLogin />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute><Owner /></ProtectedRoute>} />
              <Route path="/employee" element={<ProtectedRoute><Employee /></ProtectedRoute>} />
              <Route path="/pets" element={<ProtectedRoute><Pets /></ProtectedRoute>} />
              <Route path="/appointment" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
              <Route path="/treatment-records" element={<ProtectedRoute><TreatmentRecords /></ProtectedRoute>} />

              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>

          {token && <Footer />}
        </div>
      </div>
    </>
  );
};

export default App;
