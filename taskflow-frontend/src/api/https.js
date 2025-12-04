import axios from "axios";

export const userApi = axios.create({
  baseURL: import.meta.env.VITE_USER_API,
});

export const taskApi = axios.create({
  baseURL: import.meta.env.VITE_TASK_API,
});

// attach token to every request
const attachAuth = (config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

userApi.interceptors.request.use(attachAuth);
taskApi.interceptors.request.use(attachAuth);
