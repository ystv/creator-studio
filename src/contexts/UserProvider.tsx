import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import Axios from "axios";
import { User } from "../types/User";

const UserProvider: React.FC = (props) => {
  const [userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    Axios.request<User>({
      url: `${process.env.REACT_APP_API_BASEURL}/v1/internal/people/user`,
      withCredentials: true,
    }).then((response) => {
      setUserData(response.data);
    });
  }, []);
  const { Provider } = UserContext;
  return <Provider value={userData}>{props.children}</Provider>;
};

export default UserProvider;
