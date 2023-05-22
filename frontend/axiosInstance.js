import axios from "axios";
import { API } from "@/data";

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized Login!");
      localStorage.removeItem("token");
      window.location.href = "/admin";
    } else if (error.response && error.response.status === 404) {
      console.log("Sorry, Not Found");
    } else if (error.response && error.response.status === 500) {
      console.log("Server error!");
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
