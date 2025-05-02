import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, requiredRole, redirectPath = '/login' }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Here you would check the user's role against requiredRole
  // For now, we'll assume the role check is handled elsewhere
  return <Outlet />;
};

export default ProtectedRoute; 