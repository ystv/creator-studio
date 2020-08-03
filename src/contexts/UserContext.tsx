import { createContext, useContext } from "react";
import { User } from "../types/User";

const UserContext = createContext<User | null>(null);

export const UserInfo = () => {
  return useContext(UserContext);
};

export const UserContextConsumer = UserContext.Consumer;

export default UserContext;
