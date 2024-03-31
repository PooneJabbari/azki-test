import "../styles/globals.css";
import localFont from "next/font/local";
import type { AppProps, AppType } from "next/app";
import { UserProvider } from "@/context";

const shabnam = localFont({
  src: "../../public/fonts/Shabnam.ttf",
  weight: "400",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <main className={shabnam.className}>
        <Component {...pageProps} />
      </main>
    </UserProvider>
  );
};

export default MyApp;
