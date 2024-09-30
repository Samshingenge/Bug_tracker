//==========================================Multiple Users==========================


import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

interface User {
  _id: string;  
  name: string;
  email: string;
  // Add any other user properties
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return null;
      }
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/auth/user');
      setUser(response.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setUser(null);
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setLoading(false);
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<{token: string, user: User}>('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const refreshToken = async () => {
    try {
      const response = await api.post('/auth/refresh-token');
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

//=======================New Code for Individual User fetch Data=======

// import React, { createContext, useState, useEffect, useContext } from 'react';
// import api from '../services/api';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   userRole: string | null;
//   login: (username: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [userRole, setUserRole] = useState<string | null>(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await api.get('/auth/check');
//         setIsAuthenticated(response.data.isAuthenticated);
//         setUserRole(response.data.role);
//       } catch (error) {
//         console.error('Error checking authentication:', error);
//         setIsAuthenticated(false);
//         setUserRole(null);
//       }
//     };
//     checkAuth();
//   }, []);

//   const login = async (username: string, password: string) => {
//     try {
//       const response = await api.post('/auth/login', { username, password });
//       setIsAuthenticated(true);
//       setUserRole(response.data.role);
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await api.post('/auth/logout');
//       setIsAuthenticated(false);
//       setUserRole(null);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };