import { backendApi } from "@/api/config";
import { IUser } from "@/interfaces/user";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

interface userAuthTypes {
  id: string;
  username: string;
}

const privateRoutes = ["/calendar", "/crearGrupo", "/", "/search"];

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<userAuthTypes>({} as userAuthTypes);
  const [isTokenCheckCompleted, setIsTokenCheckCompleted] =
    useState<boolean>(false);

  const router = useRouter();

  const login = async (
    token: string,
    id: string,
    username: string,
    refresh: string
  ) => {
    try {
      setIsAuthenticated(true);
      Cookies.set("x-token", token);
      Cookies.set("x-token-refresh", refresh);
      setUser({ id, username });
      router.replace("/");
    } catch (error) {
      logout();
    }
  };

  const logout = () => {
    setUser({} as IUser);
    setIsAuthenticated(false);
    Cookies.remove("x-token");
    Cookies.remove("x-token-refresh");
    router.replace("/login");
  };

  const checkAuthToken = async () => {
    try {
      const token = Cookies.get("x-token");

      if (!token) {
        logout();
        return;
      }

      const resp = (await backendApi.get("/auth/renew")).data;

      if (resp.ok) {
        Cookies.set("x-token", resp.token);
        Cookies.set("x-token-refresh", resp.refresh);
        setUser(resp.data);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    } finally {
      setIsTokenCheckCompleted(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Don't check token on public routes
    setIsLoading(true);
    setIsTokenCheckCompleted(false);
    if (privateRoutes.includes(router.pathname)) {
      checkAuthToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (
    isLoading ||
    (!isAuthenticated &&
      isTokenCheckCompleted &&
      privateRoutes.includes(router.pathname))
  ) {
    return (
      <div className="loadingComponent">
        <div className="containerNeonLoading">
          <h2>Cargando</h2>
          <p>Por favor, espera un momento</p>
          <div className="bubbleContainer">
            <div className="bubble bubble-1" />
            <div className="bubble bubble-2" />
            <div className="bubble bubble-3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
