import Cookies from "js-cookie";
import Axios from "axios";

const getToken = (): APIToken | null => {
  let jwt = Cookies.get("token");
  if (!jwt) {
    Axios.get(`${process.env.REACT_APP_SECURITY_ENDPOINT}/api/set_token`, {
      withCredentials: true,
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
    jwt = Cookies.get("token");
  }
  let token;
  try {
    if (jwt) {
      const base64Url = jwt.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      token = JSON.parse(window.atob(base64));
    }
  } catch (error) {
    console.log(error);
  }
  return token as APIToken;
};

export default getToken;

export interface APIToken {
  exp: number;
  id: number;
  perms: permission[];
}

interface permission {
  id: number;
  name: string;
}
