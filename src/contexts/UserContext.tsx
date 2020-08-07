import { createContext, useContext } from "react";
import { IUser } from "../types/User";

const UserContext = createContext<IUser | null>(null);

export const UserInfo = () => {
  return useContext(UserContext);
};

export const UserContextConsumer = UserContext.Consumer;

export default UserContext;
