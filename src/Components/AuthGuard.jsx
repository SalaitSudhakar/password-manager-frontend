import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const { isAuthenticated, userDetails } = useSelector((state) => state.user);
  const emailVerified = userDetails?.user?.emailVerified || false;

  return isAuthenticated && emailVerified ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthGuard;
