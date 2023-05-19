import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { backendApiPrivate } from "@/services/api/config";
import { renewToken } from "@/services/auth.service";
import { AuthContext } from "@/context/auth/AuthContext";

const useAxiosPrivate = () => {
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const requestIntercept = backendApiPrivate.interceptors.request.use(
      (config) => {
        const token = Cookies.get("x-token");
        if (token) {
          config.headers["x-token"] = token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = backendApiPrivate.interceptors.response.use(
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

    return () => {
      backendApiPrivate.interceptors.request.eject(requestIntercept);
      backendApiPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [isAuthenticated, renewToken]);

  return backendApiPrivate;
};

export default useAxiosPrivate;
