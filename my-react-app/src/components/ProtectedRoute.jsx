import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  // Show loading state while checking auth
  if (loading) return <div>Loading...</div>;

  // If not logged in, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render children components
  return children;
};

export default ProtectedRoute;
