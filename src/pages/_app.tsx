import "../styles/globals.css";
import localFont from "next/font/local";
import type { AppProps, AppType } from "next/app";

const shabnam = localFont({
  src: "../../public/fonts/Shabnam.ttf",
  weight: "400",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={shabnam.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
