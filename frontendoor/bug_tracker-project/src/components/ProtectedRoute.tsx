//components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth'; // Import the authentication check function

const ProtectedRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

//BackUP

//================================User single Fetch data ===========

// import React, { useEffect, useState } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { isAuthenticated } from '../utils/auth';
// import { useAuth } from '../contexts/AuthContext';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   allowedRoles: string[];
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
//   const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
//   const { userRole } = useAuth();
//   const location = useLocation();

//   useEffect(() => {
//     const checkAuth = async () => {
//       const authed = await isAuthenticated();
//       setIsAuthed(authed);
//     };
//     checkAuth();
//   }, []);

//   if (isAuthed === null) {
//     // Still checking authentication
//     return null;
//   }

//   if (!isAuthed) {
//     // User is not authenticated, redirect to login
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (!userRole || !allowedRoles.includes(userRole)) {
//     // User is authenticated but doesn't have the required role
//     return <Navigate to="/" replace />;
//   }

//   // User is authenticated and has the required role
//   return <>{children}</>;
// };

// export default ProtectedRoute;