import { ConfigProvider } from "antd";
import esEs from "antd/locale/es_ES";
import AuthProvider from "@/context/auth/AuthProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import "antd/dist/reset.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "@/styles/index.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ConfigProvider
        locale={esEs}
        theme={{
          token: {
            colorPrimary: "#EB455F",
            colorError: "#9D2503",
          },
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </AuthProvider>
  );
}
