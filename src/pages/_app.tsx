import "@/styles/styles.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

  return      <ConfigProvider
  theme={{
    token: {
      colorPrimary: '#EB455F',
      colorError: '#9D2503',
    },
  }}
> <Component {...pageProps} />;
</ConfigProvider>
}
