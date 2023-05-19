import axios from "axios";
import Cookies from "js-cookie";
import { renewToken } from "../auth.service";

export const backendApi = axios.create({
  baseURL: "http://localhost:4000",
});

export const backendApiPrivate = axios.create({
  baseURL: "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Add a request interceptor to add the x-token header to all requests
backendApiPrivate.interceptors.request.use((config) => {
  const token = Cookies.get("x-token");

  if (token) {
    config.headers["x-token"] = token;
  }

  return config;
});

// Add a response interceptor to handle token renewal
backendApiPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevReq = error.config;
    if (
      error.response.status === 401 ||
      (error.response.status === 403 && !prevReq._retry)
    ) {
      prevReq._retry = true;

      const res = await renewToken();
      if (res.data.ok) {
        Cookies.set("x-token", res.data.token);
        return backendApiPrivate(prevReq);
      }
      return Promise.reject(error);
    }
  }
);
