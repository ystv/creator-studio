import Cookies from "js-cookie";
import Axios from "axios";

const getToken = (): Promise<APIToken> =>
  new Promise<APIToken>(async (resolve, reject) => {
    let jwt = Cookies.get("token");
    if (!jwt) {
      try {
        await Axios.get(
          `${process.env.REACT_APP_SECURITY_BASEURL}/api/set_token`,
          {
            withCredentials: true,
          }
        );
      } catch (err) {
        return reject(err);
      }
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
    if (token) {
      return resolve(token as APIToken);
    } else {
      return reject(new Error("Failed to get token"));
    }
  });

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
