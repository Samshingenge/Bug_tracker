import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Adjust the path based on your folder structure

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { isAuthenticated, user, setUser }: any = context;
  const [loading, setLoading] = useState(true);

  // Check if the user is authenticated and fetch user data if necessary
  useEffect(() => {
    if (isAuthenticated && !user) {
      // Assuming your backend has an endpoint to fetch the authenticated user's info
      const fetchUserFromBackend = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/user', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          const userData = await response.json();
          setUser(userData); // Update user data in the context
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        } finally {
          setLoading(false); // Done loading
        }
      };

      fetchUserFromBackend();
    } else {
      setLoading(false); // Already authenticated, no need to fetch
    }
  }, [isAuthenticated, user, setUser]);

  return { user, loading, isAuthenticated };
};
