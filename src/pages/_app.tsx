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
            "colorPrimary": "#eb455f",
            "colorError": "#da090c",
            "colorTextBase": "#000000",
            "colorBgBase": "#fbfbf7"
          },
          components: {
            Menu: {
              "colorPrimary": "#2b3467",
              "colorPrimaryBorder": "#bad7e9",
              "controlItemBgActive": "#cfe0ea",
              "colorItemBg": "#F1F7FC",
              "colorItemBgSelected": "#BDD2DF",
              "colorItemTextSelected": "#2b3467"
            },
            Layout: {
              colorBgHeader: '#aec7d7', // colorBgBase -3% lightness, i've pre-calculated these values manually, but it'd be smart to use color.js or something like that to manage these manipulations
            },
          }
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </AuthProvider>
  );
}
