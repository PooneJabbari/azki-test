import "../styles/globals.css";
import localFont from "next/font/local";
import type { AppProps, AppType } from "next/app";
import { UserProvider } from "@/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const shabnam = localFont({
  src: "../../public/fonts/Shabnam.ttf",
  weight: "400",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <main className={shabnam.className}>
          <Component {...pageProps} />
        </main>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
