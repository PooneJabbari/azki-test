import { FC } from "react";
import { LogoIcon, UserIcon } from "../ui";
import { useUser } from "@/context";

export const Header: FC = () => {
  const { user } = useUser();
  return (
    <header className="sticky top-0 z-10">
      <div className="flex w-full items-center justify-between px-6 py-6 sm:px-12 lg:border-none">
        {user ? (
          <div className="flex flex-row items-center space-x-2">
            <div>
              {user.fName} {user.lName}
            </div>
            <UserIcon className="h-4 w-4" />
          </div>
        ) : (
          <div>ثبت نام</div>
        )}
        <div className="hidden sm:flex">سامانه مقایسه و خرید آنلاین بیمه</div>
        <div>
          <LogoIcon className="text-teal-500" />
        </div>
      </div>
    </header>
  );
};
