import axios, { AxiosResponse } from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SECURITY_BASEURL,
    withCredentials: true
  })
  
  const  resBody = (res: AxiosResponse) => res.data;

  const reqs = {
    get: (path: string) => instance.get(path).then(resBody),
    post: (path: string, body: {}) => instance.post(path, body).then(resBody),
    put: (path: string, body: {}) => instance.put(path, body).then(resBody),
    delete: (path: string) => instance.delete(path).then(resBody),
  }

export const Token = {
    getToken: () => reqs.get("/api/set_token"),
    testToken: () => reqs.get("/api/test"),
}
