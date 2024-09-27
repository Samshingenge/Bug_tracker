import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';  // Adjust this path as needed
 import axios from 'axios';
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
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


 

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token); // Log the token
  
      if (!token) {
        console.log('No token found in localStorage');
        setUser(null);
        return null;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      console.log('Sending request with config:', config); // Log the config
  
      const response = await axios.get('http://localhost:5000/api/auth/user', config);
      console.log('User data received:', response.data); // Log the response data
  
      setUser(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to fetch user data:', error.response?.data || error.message);
      } else {
        console.error('Failed to fetch user data:', error);
      }
      setUser(null);
      throw error;
    }
  };


  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, skipping user fetch');
        setLoading(false);
        return;
      }
      try {
        await fetchUser();
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<{token: string, user: User}>('/auth/login', { email, password });
      console.log('Login response:', response.data); // Log the response
  
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
      
      console.log('Token stored:', localStorage.getItem('token')); // Verify token storage
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];  // Clear default header
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};