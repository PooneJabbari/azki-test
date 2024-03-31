import { FC, PropsWithChildren } from "react";

export const Title: FC<PropsWithChildren> = ({ children }) => {
  return (
    <p className="text-center text-lg font-bold sm:text-right sm:text-2xl">
      {children}
    </p>
  );
};
