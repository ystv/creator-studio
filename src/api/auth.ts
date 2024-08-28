import axios, {AxiosResponse} from "axios";

interface AccessToken {
    token: string
}

// const instance = axios.create({
//     baseURL: process.env.REACT_APP_SECURITY_BASEURL,
//     withCredentials: true,
// });

const resBody = (res: AxiosResponse) => res.data;

// const reqs = {
//     get: (path: string) => instance.get(path).then(resBody),
//     post: (path: string, body: {}) => instance.post(path, body).then(resBody),
//     put: (path: string, body: {}) => instance.put(path, body).then(resBody),
//     delete: (path: string) => instance.delete(path).then(resBody),
// };

export const Token = {
    getToken: (): Promise<AccessToken> => axios({
        method: "get",
        baseURL: process.env.REACT_APP_SECURITY_BASEURL,
        url: "/api/set_token",
        withCredentials: true,
    }).then(resBody),
    testToken: () => axios({
        method: "get",
        baseURL: process.env.REACT_APP_SECURITY_BASEURL,
        url: "/api/test",
        withCredentials: true,
    }).then(resBody),
    // getToken: (): Promise<AccessToken> => reqs.get("/api/set_token"),
    // testToken: () => reqs.get("/api/test"),
};
