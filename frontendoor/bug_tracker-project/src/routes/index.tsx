import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from '../pages/Auth';
import Dashboard from '../components/dashboard/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute'; // Import the ProtectedRoute component


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Auth />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      {/* Catch-all route to redirect to the login page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

//=================================

// import React from 'react';
// import Auth from '../pages/Auth';
// import Dashboard from '../components/dashboard/Dashboard';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import LoginForm from '../components/auth/LoginForm';
// import AdminProjectsView from '../components/AdminProjectsView';
// import UserProjectsView from '../components/UserProjectsView';
// import ProtectedRoute from '../components/ProtectedRoute';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginForm />} />
//         <Route 
//           path="/projects" 
//           element={
//             <ProtectedRoute allowedRoles={['admin', 'user']}>
//               {JSON.parse(localStorage.getItem('user') || '{}').role === 'admin' 
//                 ? <AdminProjectsView /> 
//                 : <UserProjectsView />
//               }
//               <Route path="/dashboard" element={<Dashboard />} />
//             </ProtectedRoute>
//           } 
//         />
//         <Route path="/" element={<Navigate to="/projects" replace />} />
//       </Routes>
//     </Router>
//   );
// };
// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import LoginForm from '../components/auth/LoginForm';
// import AdminProjectsView from '../components/AdminProjectsView';
// import UserProjectsView from '../components/UserProjectsView';
// import Dashboard from '../components/dashboard/Dashboard';
// import ProtectedRoute from '../components/ProtectedRoute';

// const App: React.FC = () => {
//   const userRole = JSON.parse(localStorage.getItem('user') || '{}').role;

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginForm />} />
//         <Route 
//           path="/projects" 
//           element={
//             <ProtectedRoute allowedRoles={['admin', 'user']}>
//               {userRole === 'admin' ? <AdminProjectsView /> : <UserProjectsView />}
//             </ProtectedRoute>
//           } 
//         />
//         <Route 
//           path="/dashboard" 
//           element={
//             <ProtectedRoute allowedRoles={['admin', 'user']}>
//               <Dashboard />
//             </ProtectedRoute>
//           } 
//         />
//         <Route path="/" element={<Navigate to="/projects" replace />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
