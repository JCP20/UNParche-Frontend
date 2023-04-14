import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { backendApi } from "@/api/config";
import { IUser } from "@/interfaces/user";

interface userAuthTypes {
  id: string;
  username: string;
}

const AuthProvider = ({ children }: { children: JSX.Element }) => {
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
    const publicRoutes = ["/login"];

    const token = Cookies.get("x-token");

    if (!token) {
      logout();
      return;
    }

    try {
      const resp: { ok: boolean; token: string; data: IUser } = (
        await backendApi.get("/auth/renew")
      ).data as { ok: boolean; token: string; data: IUser };

      if (resp.ok) {
        setUser(resp.data);
        setIsAuthenticated(true);

        if (publicRoutes.includes(router.pathname)) {
          router.replace("/");
        }
      } else {
        logout();
      }
    } catch (error) {}
  };

  useEffect(() => {
    // Don't check token on an array of defined public routes
    if (!"/404".includes(router.pathname)) {
      checkAuthToken();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
