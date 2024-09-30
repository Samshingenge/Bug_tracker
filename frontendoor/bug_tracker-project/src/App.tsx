import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/index'; // Adjust the path if necessary

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;


//==================New Code for Single onwer Fecth data=================================

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import LoginForm from './components/auth/LoginForm';
// import AdminProjectsView from './components/AdminProjectsView';
// import UserProjectsView from './components/UserProjectsView';
// import Dashboard from './components/dashboard/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import { useAuth } from './contexts/AuthContext';

// const App: React.FC = () => {
//   const { userRole } = useAuth();

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
//         <Route path="/" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;








