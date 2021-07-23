import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { IUser } from "../types/User";
import { User } from "../api/api";

const UserProvider: React.FC = (props) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  useEffect(() => {
    User.getUser()
    .then(res => {
      setUserData(res);
    });
  }, []);
  const { Provider } = UserContext;
  return <Provider value={userData}>{props.children}</Provider>;
};

export default UserProvider;
