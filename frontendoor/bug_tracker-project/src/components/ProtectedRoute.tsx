// components/ProtectedRoute.tsx
import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth'; // Import the authentication check function

const ProtectedRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
