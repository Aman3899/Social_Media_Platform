import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated,elementIfAuthenticated }) => {
  return isAuthenticated ? elementIfAuthenticated : <Navigate to="/login" />;
};

export default ProtectedRoute;
