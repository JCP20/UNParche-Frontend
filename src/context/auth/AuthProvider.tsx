import { logoutUser, renewToken } from "@/services/auth.service";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

interface userAuthTypes {
  id: string;
  username: string;
  role: string;
}

const publicRoutes = [
  "/login",
  "/register",
  "/landing",
  "/verification/[id]",
  "/landingPage",
];

const adminRoutes = ["/admin"];

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [persist, setPersist] = useState<boolean>(() => {
  //   const persistCheck = localStorage.getItem("persist");
  //   return persistCheck ? JSON.parse(persistCheck) : false;
  // });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<userAuthTypes>({} as userAuthTypes);
  const [isTokenCheckCompleted, setIsTokenCheckCompleted] =
    useState<boolean>(false);

  const router = useRouter();

  const login = async (token: string, userInfo: userAuthTypes) => {
    try {
      setIsAuthenticated(true);
      Cookies.set("x-token", token);
      setUser(userInfo);
      router.replace("/");
    } catch (error) {
      logout();
    }
  };

  const logout = async () => {
    setUser({} as userAuthTypes);
    setIsAuthenticated(false);
    Cookies.remove("x-token");
    await logoutUser();
    router.replace("/login");
  };

  const checkAuthToken = async () => {
    try {
      const token = Cookies.get("x-token");

      if (!token) {
        logout();
        return;
      }

      const resp = await renewToken();

      if (resp?.data?.ok) {
        setIsAuthenticated(true);
        Cookies.set("x-token", resp.data.token);
        setUser({
          id: resp.data.id,
          username: resp.data.username,
          role: resp.data.role,
        });
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

  const checkIfUserIsAdmin = () => {
    if (user?.role !== "admin") {
      router.replace("/");
    }
  };

  useEffect(() => {
    // Don't check token on public routes
    setIsLoading(true);
    setIsTokenCheckCompleted(false);
    if (!publicRoutes.includes(router.pathname)) {
      checkAuthToken();

      if (adminRoutes.includes(router.pathname)) {
        checkIfUserIsAdmin();
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  if (
    isLoading ||
    (!isAuthenticated &&
      isTokenCheckCompleted &&
      !publicRoutes.includes(router.pathname))
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
