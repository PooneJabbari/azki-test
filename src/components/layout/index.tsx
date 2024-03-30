import Head from "next/head";
import { PropsWithChildren, type FC, ComponentProps } from "react";
import { Header } from "./Header";

export const Layout: FC<PropsWithChildren<ComponentProps<typeof Head>>> = ({
  children,
}) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="relative flex-1">{children}</main>
    </div>
  );
};
