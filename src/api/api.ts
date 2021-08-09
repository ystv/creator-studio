import axios, { AxiosResponse } from "axios";
import IChannel from "../types/Channel";
import ICreatorStats from "../types/Creator";
import IPreset from "../types/EncodePreset";
import IEncodeFormat from "../types/EncodeProfile";
import { IPlaylist } from "../types/Playlist";
import { ISeries } from "../types/Series";
import { IUser } from "../types/User";
import { INewVideo, IVideo, IVideoCalendar, IVideoMeta } from "../types/Video";
import { setupInterceptorsTo } from "./interceptors";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  withCredentials: true,
});

setupInterceptorsTo(instance);

const resBody = (res: AxiosResponse) => res.data;

const reqs = {
  get: (path: string) => instance.get(path).then(resBody),
  post: (path: string, body: {}) => instance.post(path, body).then(resBody),
  put: (path: string, body: {}) => instance.put(path, body).then(resBody),
  delete: (path: string) => instance.delete(path).then(resBody),
};

export const Video = {
  getVideos: (): Promise<IVideoMeta[]> =>
    reqs.get("/v1/internal/creator/video"),
  getVideosByCurrentUser: (): Promise<IVideo[]> =>
    reqs.get("/v1/internal/creator/video/my"), //TODO: Implement get by user ID and move this endpoint
  getVideosByMonth: (year: number, month: number): Promise<IVideoCalendar[]> =>
    reqs.get(`/v1/internal/creator/calendar/${year}/${month}`),
  getVideo: (id: number): Promise<IVideo> =>
    reqs.get(`/v1/internal/creator/video/${id}`),
  searchVideo: (query: string): Promise<IVideoMeta[]> =>
    reqs.post("/v1/internal/creator/video/search", { query }),
  createVideo: (v: INewVideo): Promise<IVideo> =>
    reqs.post("/v1/internal/creator/video", v),
  createVideoThumbnail: (f: Blob): Promise<string> =>
    reqs.post("/v1/internal/creator/video/thumbnail", f),
  updateVideoMeta: (v: IVideo): Promise<IVideo> =>
    reqs.put("/v1/internal/creator/video/meta", v),
};

export const Series = {
  getAllSeries: (): Promise<ISeries[]> =>
    reqs.get("/v1/internal/creator/series"),
  getSeries: (id: number): Promise<ISeries> =>
    reqs.get(`/v1/internal/creator/series/${id}`),
};

export const Playlist = {
  getPlaylists: (): Promise<IPlaylist[]> =>
    reqs.get("/v1/internal/creator/playlist"),
  createPlaylist: (p: IPlaylist): Promise<IPlaylist> =>
    reqs.post("/v1/internal/creator/playlist", p),
  updatePlaylist: (p: IPlaylist): Promise<IPlaylist> =>
    reqs.put("/v1/internal/creator/playlist", p),
  getPlaylist: (id: number): Promise<IPlaylist> =>
    reqs.get(`/v1/internal/creator/playlist/${id}`),
};

export const Encode = {
  getPresets: (): Promise<IPreset[]> =>
    reqs.get("/v1/internal/creator/encode/preset"),
  createPreset: (p: IPreset): Promise<IPreset> =>
    reqs.post("/v1/internal/creator/encode/preset", p),
  updatePreset: (p: IPreset): Promise<IPreset> =>
    reqs.put("/v1/internal/creator/encode/preset", p),
  deletePreset: (presetID: number): Promise<void> =>
    reqs.delete(`/v1/internal/creator/encode/preset/${presetID}`),
  getFormats: (): Promise<IEncodeFormat[]> =>
    reqs.get("/v1/internal/creator/encode/format"),
  createFormat: (f: IEncodeFormat): Promise<number> =>
    reqs.post("/v1/internal/creator/encode/format", f),
  updateFormat: (f: IEncodeFormat): Promise<void> =>
    reqs.put("/v1/internal/creator/encode/format", f),
  deleteFormat: (formatID: number): Promise<void> =>
    reqs.delete(`/v1/internal/creator/encode/format/${formatID}`),
};

export const Creator = {
  getStats: (): Promise<ICreatorStats> =>
    reqs.get("/v1/internal/creator/stats"),
};

export const User = {
  getUser: (): Promise<IUser> => reqs.get("/v1/internal/people/user"),
};

export const Channel = {
  getChannels: (): Promise<IChannel> =>
    reqs.get("/v1/internal/creator/playout/channels"),
};
