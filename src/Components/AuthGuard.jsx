import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthGuard;
