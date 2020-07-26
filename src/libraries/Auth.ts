import Cookies from "js-cookie";

const getToken = () => {
  const jwt = Cookies.get("token");
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
  console.log(token);
  return token;
};

export default getToken;
