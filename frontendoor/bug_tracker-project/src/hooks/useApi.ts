// import axios from 'axios';

// type HttpMethod = 'get' | 'post' | 'put' | 'delete';

// const API_BASE_URL = 'http://localhost:5000'; // Add this line


// export const useApi = () => {
//   const request = async (method: HttpMethod, url: string, data?: any) => {
//     try {
//       const fullUrl = `${API_BASE_URL}${url}`; // Construct the full URL
//       const response = await axios({
//         method,
//         url: fullUrl, // Use the full URL here
//         data,
//         headers: {
//           'Content-Type': 'application/json',
//           // Add other headers if needed, e.g., Authorization
//         },
//       });
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error(`API request failed: ${error.message}`);
//         console.error('Error response:', error.response?.data);
//         throw new Error(`API request failed: ${error.message}`);
//       } else if (error instanceof Error) {
//         console.error(`API request failed: ${error.message}`);
//         throw new Error(`API request failed: ${error.message}`);
//       } else {
//         console.error('API request failed: Unknown error');
//         throw new Error('API request failed: Unknown error');
//       }
//     }
//   };

//   return { request };
// };




import axios from 'axios';

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

const API_BASE_URL = '/api'; // Update to use the proxy path

export const useApi = () => {
  const request = async (method: HttpMethod, url: string, data?: any) => {
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage
    
    try {
      const response = await axios({         // Error found
        method, 
        url: `${API_BASE_URL}${url}`, // Use the proxy for all API requests
        data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Add token to the Authorization header
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`API request failed: ${error.message}`);
        throw new Error(`API request failed: ${error.message}`);
      } else {
        console.error('API request failed: Unknown error');
        throw new Error('API request failed: Unknown error');
      }
    }
  };

  return { request };
};


// import axios from "axios";

// export default axios.create({
//   baseURL: 'http://localhost:5000'
// });



































// import axios from 'axios';

// type HttpMethod = 'get' | 'post' | 'put' | 'delete';

// export const useApi = () => {
//   const request = async (method: HttpMethod, url: string, data?: any) => {
//     try {
//       const response = await axios({
//         method,
//         url,
//         data,
//         headers: {
//           'Content-Type': 'application/json',
//           // Add other headers if needed, e.g., Authorization
//         },
//       });
//       return response.data;
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error(`API request failed: ${error.message}`); //Error detacted
//         throw new Error(`API request failed: ${error.message}`);
//       } else {
//         console.error('API request failed: Unknown error');
//         throw new Error('API request failed: Unknown error');
//       }
//     }
//   };

//   return { request };
// };


// import { useState, useCallback } from 'react';

// const API_BASE_URL = 'http://localhost:5000';

// export const useApi = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState< | null>(null);

//   const request = useCallback(async (method: HttpMethod, endpoint, body = null) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`${API_BASE_URL}${endpoint}`, { // error 
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: body ? JSON.stringify(body) : null,
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setLoading(false);
//       return data;
//     } catch (e) {
//       if (e instanceof Error) {
//         setError(e.message);  // Now it's safe to access `e.message`
//       } else {
//         setError('An unknown error occurred.');
//       }
//       setLoading(false);
//       throw e;
//     }
//   }, []);

//   return { request, loading, error };
// };
