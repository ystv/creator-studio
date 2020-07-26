import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import Axios from "axios";
import { User } from "../types/User";

const defaultUser = {
  userID: 0,
  nickname: "User",
  avatar: "https://ystv.co.uk/static/images/members/thumb/3348.jpg",
  roles: ["creatorAdmin"],
};

const UserProvider: React.FC = (props) => {
  const [userData, setUserData] = useState<User>(defaultUser);
  useEffect(() => {
    Axios.request<User>({
      url: "https://api.ystv.co.uk/v1/internal/user",
      withCredentials: true,
    }).then((response) => {
      setUserData(response.data);
    });
  }, []);
  const { Provider } = UserContext;
  return <Provider value={userData}>{props.children}</Provider>;
};

export default UserProvider;