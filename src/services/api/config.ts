import axios from "axios";
import Cookies from "js-cookie";

export const backendApi = axios.create({
  baseURL: "http://localhost:4000",
});

export const backendApiPrivate = axios.create({
  baseURL: "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Add a request interceptor to add the x-token header to all requests
// backendApiPrivate.interceptors.request.use((config) => {
//   const token = Cookies.get("x-token");

//   if (token) {
//     config.headers["x-token"] = token;
//   }

//   return config;
// });
