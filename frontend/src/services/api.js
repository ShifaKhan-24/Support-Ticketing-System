import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',  // Replace this with your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach the token to the request
  }
  return config;
}, (error) => {
  // Handle the error
  return Promise.reject(error);
});

// Add a response interceptor to handle session expiration and unauthorized access
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Check if the error is due to session expiration
      if (error.response.data.message === 'Session expired. Please log in again.') {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('token'); // Clear token from localStorage
        window.location.href = '/'; // Redirect to login page
      } else {
        // Handle other 401 errors
        alert('Unauthorized access. Please log in.');
        localStorage.removeItem('token');
        window.location.href = '/'; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default api;
