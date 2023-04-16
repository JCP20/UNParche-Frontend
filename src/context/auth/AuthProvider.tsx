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

  const router = useRouter();

  const login = async (token: string, id: string, username: string) => {
    try {
      setIsAuthenticated(true);
      Cookies.set("x-token", token);
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
    router.replace("/login");
  };

  const checkAuthToken = async () => {
    try {
      const token = Cookies.get("x-token");

      if (!token) {
        logout();
        return;
      }

      const resp: { ok: boolean; token: string; data: IUser } = (
        await backendApi.get("/auth/renew")
      ).data as { ok: boolean; token: string; data: IUser };

      if (resp.ok) {
        setUser(resp.data);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Don't check token on an array of defined public routes
    setIsLoading(true);
    if (privateRoutes.includes(router.pathname)) {
      checkAuthToken();
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="loadingComponent">
        <div className="containerNeonLoading">
          <h2>Cargando...</h2>
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
