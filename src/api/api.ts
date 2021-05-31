import axios, { AxiosResponse } from "axios";
import { IVideo, IVideoMeta } from "../types/Video";



const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  withCredentials: true
})

const  resBody = (res: AxiosResponse) => res.data;

const reqs = {
  get: (path: string) => instance.get(path).then(resBody),
  post: (path: string, body: {}) => instance.post(path, body).then(resBody),
  put: (path: string, body: {}) => instance.put(path, body).then(resBody),
  delete: (path: string) => instance.delete(path).then(resBody),
}

export const Video = {
  getVideos: (): Promise<IVideoMeta[]> => reqs.get("/v1/internal/creator/videos"),
  getVideo: (id: number): Promise<IVideo> => reqs.get(`/v1/internal/creator/videos/${id}`),
  createVideo: (v: IVideo): Promise<IVideo> => reqs.post("/v1/internal/videos", v),
  updateVideo: (v: IVideo): Promise<IVideo> => reqs.put("/v1/internal/creator/videos", v)
}
