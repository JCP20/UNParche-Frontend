import { createContext } from "react";

interface ContextProps {
  isAuthenticated: boolean;
  login: (token: string, id: string, username: string) => void;
  logout: () => void;
  user: { id: string; username: string };
}

export const AuthContext = createContext({} as ContextProps);
