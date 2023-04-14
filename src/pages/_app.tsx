import AuthProvider from "@/context/auth/AuthProvider";
import "@/styles/index.scss";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#EB455F",
            colorError: "#9D2503",
          },
        }}
      >
        <Head>
          <link rel="icon" href="/imagenes/Logo_peque.jpeg" />
        </Head>
        <Component {...pageProps} />
      </ConfigProvider>
    </AuthProvider>
  );
}
