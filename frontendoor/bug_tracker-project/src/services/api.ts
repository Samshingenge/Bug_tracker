import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example login function (commented out for now)
export const login = async (email: string, password: string) => {
  return api.post('/login', { email, password });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { user: { id: 1, name: 'Test User', role: 'admin' } } });
    }, 1000);
  });
};

export default api;
