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
  signUp: (user: User) => void;
};

const userContextDefaultValues: userContextType = {
  user: undefined,
  signUp: () => {},
};

const UserContext = createContext<userContextType>(userContextDefaultValues);

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User>();

  const signUp = (user: User) => {
    setUser(user);
  };

  const value = {
    user,
    signUp,
  };

  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
};
