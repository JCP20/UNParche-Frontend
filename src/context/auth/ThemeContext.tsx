import React, { createContext, useContext, useState } from "react";

export type Theme = "lightMode" | "darkMode"; // Add appropriate theme values

export type ThemeContextType = {
  contextTheme: Theme;
  setContextTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  contextTheme: "lightMode",
  setContextTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [contextTheme, setContextTheme] = useState<Theme>("lightMode");
  const values: ThemeContextType = { contextTheme, setContextTheme };
  return (
    <ThemeContext.Provider value={values}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  return context;
};