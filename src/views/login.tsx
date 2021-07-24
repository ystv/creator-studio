import React from "react";
import getToken from "../libraries/Auth";
import { Redirect } from "react-router-dom";

const Login: React.FC = () => {
  getToken().catch(() => {
    return (window.location.href = `${process.env.REACT_APP_SECURITY_BASEURL}/?callback=${window.location}`);
  });
  return <Redirect to="/" />;
};

export default Login;
