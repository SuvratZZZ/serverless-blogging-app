import axios from 'axios';
import { BASE_URL } from './base';

const api = axios.create({
  baseURL: BASE_URL, // Base URL for your backend
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