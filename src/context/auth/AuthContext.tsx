import { createContext } from "react";

interface ContextProps {
  isAuthenticated: boolean;
  login: (token: string, useInfo: any) => void;
  logout: () => void;
  user: { id: string; username: string; role: string };
}

export const AuthContext = createContext({} as ContextProps);
