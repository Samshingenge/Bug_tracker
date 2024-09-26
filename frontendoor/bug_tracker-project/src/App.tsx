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
  










// import LoginForm  from './components/auth/LoginForm'
// import RegistrationForm from './components/auth/RegistrationForm'


// function App() {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       {/* <LoginForm /> */}
//       <RegistrationForm />
//     </div>
//   )
// }

// export default App



