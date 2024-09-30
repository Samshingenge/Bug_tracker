
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // adjust this to match your backend URL
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Define your API functions
export const fetchDashboardData = async () => {
  try {
    const response = await api.get('/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// Add other API functions as needed
export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Add more API functions here as needed...

export default api;



//===========================Working==================
// //services/api.ts
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',  // adjust this to match your backend URL
// });

// // Add a request interceptor
// api.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// export default api;
//================================Up working===

