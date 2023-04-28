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
            colorBgBase: '#fbfbf7',
          },
          components: {
            Layout: {
              colorBgHeader: '#bad7e9b5' // colorBgBase -3% lightness, i've pre-calculated these values manually, but it'd be smart to use color.js or something like that to manage these manipulations
            },
          }
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
