import React from "react";
import UserContext from "./UserContext";
import { IUser } from "../types/User";

interface ProviderProps {
  user?: IUser
}

const UserProvider: React.FC<ProviderProps> = (props) => {
  let defaultUser: IUser = {
    userID: 0,
    nickname: "Dev",
    avatar: "",
    firstName: "Development",
    lastName: "Account",
    permissions: [
      {
        permissionID: 0,
        name: "dev"
      }
    ]
  }
  let user: IUser
  if (props.user === undefined) {
    user = defaultUser
  } else {
    user = props.user
  }
  const { Provider } = UserContext;
  return <Provider value={user}>{props.children}</Provider>;
};

export default UserProvider;
