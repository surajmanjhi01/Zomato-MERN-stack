import axios from 'axios';

const configuredBaseUrl = import.meta.env.VITE_API_URL?.trim();
const isProduction = import.meta.env.PROD;
const isLocalhostUrl = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(
  configuredBaseUrl || ''
);
const fallbackBaseUrl = isProduction ? window.location.origin : 'http://localhost:4000';
const baseURL = configuredBaseUrl && (!isProduction || !isLocalhostUrl)
  ? configuredBaseUrl
  : fallbackBaseUrl;

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 300000, // 5 minutes timeout for large file uploads
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token && !config.headers?.Authorization) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export default api;