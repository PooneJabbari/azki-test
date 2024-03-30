import Head from "next/head";
import { PropsWithChildren, type FC, ComponentProps } from "react";
import { Header } from "./Header";
import { CarIcon } from "../ui";

export const Layout: FC<PropsWithChildren<ComponentProps<typeof Head>>> = ({
  children,
}) => {
  return (
    <div className="flex h-screen flex-col">
      <div className="fixed bottom-0 left-0 -z-10 h-1/4 w-full bg-orange-50 sm:top-0 sm:h-full sm:w-1/4" />
      <Header />
      <main className="relative h-1/2 sm:h-full sm:w-3/4 sm:self-end">
        {children}
      </main>
      <div className="absolute bottom-0 h-1/2 w-3/4 p-4 sm:w-1/2">
        <CarIcon className="h-full w-full" />
      </div>
    </div>
  );
};
