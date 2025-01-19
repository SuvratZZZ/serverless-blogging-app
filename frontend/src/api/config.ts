import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Base URL for your backend
});

// Add Authorization header dynamically from local storage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;