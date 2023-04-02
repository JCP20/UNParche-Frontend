import AuthProvider from "@/context/auth/AuthProvider";
import "@/styles/index.scss";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

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
        <Component {...pageProps} />
      </ConfigProvider>
    </AuthProvider>
  );
}
