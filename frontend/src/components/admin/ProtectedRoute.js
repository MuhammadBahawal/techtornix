import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Check admin authentication from localStorage
  const adminAuth = localStorage.getItem('adminAuth');
  const adminData = localStorage.getItem('adminData');
  const adminToken = localStorage.getItem('adminToken');

  const isAdminAuthenticated = adminAuth === 'true' && adminData && adminToken;

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
