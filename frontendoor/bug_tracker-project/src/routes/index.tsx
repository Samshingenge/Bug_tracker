import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from '../pages/Auth';
import Dashboard from '../components/dashboard/Dashboard';
import Projects from '../pages/Projects';
import Bugs from '../pages/Bugs';
import ProtectedRoute from '../components/ProtectedRoute'; // Import the ProtectedRoute component
import MainContent from '@/components/dashboard/MainContent';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Auth />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/bugs" element={<Bugs />} />
        </Route>
      </Route>

      {/* Catch-all route to redirect to the login page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
