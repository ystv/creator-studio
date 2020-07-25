import { createContext, useContext } from "react";
import { User } from "./types/User";

const UserContext = createContext<User>({
  userID: 0,
  nickname: "User",
  avatar: "https://ystv.co.uk/static/images/members/thumb/3348.jpg",
  exp: 0,
});

export const UserInfo = () => {
  return useContext(UserContext);
};

export default UserContext;
