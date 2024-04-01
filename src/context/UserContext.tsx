import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type User = {
  fName: string;
  lName: string;
};

type userContextType = {
  user: User | undefined;
  setUser: (user: User) => void;
};

const userContextDefaultValues: userContextType = {
  user: undefined,
  setUser: () => {},
};

const UserContext = createContext<userContextType>(userContextDefaultValues);

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User>();

  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
