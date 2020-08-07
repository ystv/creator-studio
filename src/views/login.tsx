import React, { useEffect } from "react";
import getToken from "../libraries/Auth";
import { Redirect } from "react-router-dom";
import { Result, Button } from "antd";

const Login: React.FC = () => {
  window.location.href = `${process.env.REACT_APP_SECURITY_ENDPOINT}/?callback=${window.location}`;
  return null;
  // useEffect(() => {
  //   if (getToken()) {
  //     console.log("got it");
  //   } else {
  //     console.log("Nag udw");
  //   }
  // }, [getToken]);
  // const token = getToken();
  // if (!token) {
  //   return (
  //     <Result
  //       title="Please sign-in to continue"
  //       extra={
  //         <a
  //           href={`${process.env.REACT_APP_SECURITY_ENDPOINT}/?callback=${window.location}`}
  //         >
  //           <Button type="primary">Login</Button>
  //         </a>
  //       }
  //     />
  //   );
  // }
  // return <Redirect to="/" />;
};

export default Login;
