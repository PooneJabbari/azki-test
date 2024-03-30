import { FC } from "react";
import { LogoIcon } from "../ui";

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-10">
      <div className="flex w-full items-center justify-between px-6 py-6 sm:px-12 lg:border-none">
        <div>ثبت نام</div>
        <div className="hidden sm:flex">سامانه مقایسه و خرید آنلاین بیمه</div>
        <div>
          <LogoIcon className="text-teal-500" />
        </div>
      </div>
    </header>
  );
};
