import { createContext, useContext } from "react";
import { User } from "../types/User";

const defaultUser = {
  userID: 0,
  nickname: "User",
  avatar: "https://ystv.co.uk/static/images/members/thumb/3348.jpg",
  roles: ["creatorAdmin"],
};

const UserContext = createContext<User>(defaultUser);

export const UserInfo = () => {
  return useContext(UserContext);
};

export default UserContext;
