// 1. First, update ProtectedRoute.tsx to use UserContext:

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>; // Consider a proper loading component
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;