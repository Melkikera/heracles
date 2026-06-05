import axios from 'axios';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7166/api',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': import.meta.env.VITE_API_KEY || 'dev-secret'
  }
});

// Optional: Add request interceptor for logging or token refresh
apiClient.interceptors.request.use(
  (config) => {
    // You can add additional logic here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access - check API key');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
