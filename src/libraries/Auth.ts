import { Token } from "../api/auth";
import { APIToken } from "../types/APIToken";

const getToken = (): Promise<APIToken> =>
  new Promise<APIToken>(async (resolve, reject) => {
    let accessToken = sessionStorage.getItem("token");
    if (!accessToken) {
      try {
        await Token.getToken()
      } catch (err) {
        return reject(err);
      }
    }
    try {
      if (accessToken) {
        const base64Url = accessToken.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        let token: APIToken = JSON.parse(window.atob(base64));
        
        if (Date.now() >= token.exp * 1000) {
          return reject(new Error("expired token"));
        }
        return resolve(token);
      }
    } catch (error) {
      return reject(new Error("failed to get token: " + error))
    }
  }
  );

export default getToken;
