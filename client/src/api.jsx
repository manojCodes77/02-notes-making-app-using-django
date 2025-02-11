import axios from "axios";

const apiUrl="https://68bfba3a-628b-4a7e-8eb7-36b81c44d634-dev.e1-us-east-azure.choreoapis.dev/notesmakingapp/server/v1/";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL?import.meta.env.VITE_API_URL:apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;