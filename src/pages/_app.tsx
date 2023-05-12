import { Button, ConfigProvider, Switch, theme } from "antd";
import esEs from "antd/locale/es_ES";
import AuthProvider from "@/context/auth/AuthProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import "antd/dist/reset.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "@/styles/index.scss";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [darkMode, setDarkMode] = useState(false);
  return (
    <AuthProvider>
      <ConfigProvider
        locale={esEs}
        theme={{
          algorithm: defaultAlgorithm,
          token: {
            colorPrimary: "#eb455f",
            colorError: "#da090c",
          },
          components: {
            Menu: {
              colorPrimary: "#2b3467",
              colorPrimaryBorder: "#bad7e9",
              controlItemBgActive: "#cfe0ea",
              colorItemBg: "#f1f7fc71",
              colorItemBgSelected: "#BDD2DF",
              colorItemTextSelected: "#2b3467",
              colorItemTextHover: "rgba(0, 0, 0, 0.88)",
            },
            Layout: {
              colorBgHeader: "#aec7d7",
            },
          },
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </AuthProvider>
  );
}
