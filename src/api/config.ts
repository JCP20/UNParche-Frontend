import axios from "axios";

export const backendApi = axios.create({
  baseURL: "http://localhost:4000",
});
