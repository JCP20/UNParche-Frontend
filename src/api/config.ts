import axios from "axios";
import Cookies from "js-cookie";

export const backendApi = axios.create({
  baseURL: "http://localhost:4000",
});

// Add a request interceptor to add the x-token header to all requests
backendApi.interceptors.request.use((config) => {
  const token = Cookies.get("x-token");
  const refresh = Cookies.get("x-token-refresh");

  if (token) {
    config.headers["x-token"] = token;
  }
  if (refresh) {
    config.headers["x-token-refresh"] = refresh;
  }
  return config;
});
