import { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-10 ">
      <div className="flex w-full items-center justify-between border-b border-primary-500 py-6 lg:border-none bg-red-500 px-4 md:px-12">
        <div>ثبت نام</div>
        <div>سامانه مقایسه و خرید آنلاین بیمه</div>
        <div>ثبت نام</div>
      </div>
    </header>
  );
};
