import axios from "axios"
import { ACCESS_TOKEN } from "./constants";

// 1. We define the "Base URL" of your Django server
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : "http://localhost:8000",
});

// 2. We add a "Interceptor" (A pre-flight check)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      // Automatically add the "Authorization" header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;