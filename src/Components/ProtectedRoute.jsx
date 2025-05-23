import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, userDetails } = useSelector((state) => state.user);

  const user = userDetails?.user;

  const userRole = user?.role;
  const emailVerified = user?.emailVerified;

  if (!isAuthenticated || !emailVerified) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/page-not-found" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
