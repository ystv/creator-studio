import axios, { AxiosResponse } from "axios";
import ICreatorStats from "../types/Creator";
import IPreset from "../types/EncodePreset";
import IEncodeFormat from "../types/EncodeProfile";
import { IPlaylist, IPlaylistNew } from "../types/Playlist";
import { ISeries } from "../types/Series";
import { IUser } from "../types/User";
import { INewVideo, IVideo, IVideoCalendar, IVideoMeta } from "../types/Video";

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
  getVideosByCurrentUser: (): Promise<IVideo[]> => reqs.get("/v1/internal/creator/videos/my"), //TODO: Implement get by user ID and move this endpoint
  getVideosByMonth: (year: number, month: number): Promise<IVideoCalendar[]> => reqs.get(`/v1/internal/creator/calendar/${year}/${month}`),
  getVideo: (id: number): Promise<IVideo> => reqs.get(`/v1/internal/creator/videos/${id}`),
  createVideo: (v: INewVideo): Promise<IVideo> => reqs.post("/v1/internal/creator/videos", v),
  updateVideo: (v: IVideo): Promise<IVideo> => reqs.put("/v1/internal/creator/videos", v)
}

export const Series = {
   getAllSeries: (): Promise<ISeries[]> => reqs.get("/v1/internal/creator/series"),
   getSeries: (id: number): Promise<ISeries> => reqs.get(`/v1/internal/creator/series/${id}`)
}

export const Playlist = {
  getPlaylists: (): Promise<IPlaylist[]> => reqs.get("/v1/internal/creator/playlists"),
  createPlaylist: (p: IPlaylistNew): Promise<IPlaylist> => reqs.post("/v1/internal/creator/playlists", p),
  updatePlaylist: (p: IPlaylistNew): Promise<IPlaylist> => reqs.put("/v1/internal/creator/playlists", p),
  getPlaylist: (id: number): Promise<IPlaylist> => reqs.get(`/v1/internal/creator/playlist/${id}`)
}

export const Encodes = {
  getAllPresets: (): Promise<IPreset[]> => reqs.get("/v1/internal/creator/encodes/presets"),
  createPreset: (p: IPreset): Promise<IPreset> => reqs.post("/v1/internal/creator/encodes/presets", p),
  updatePreset: (p: IPreset): Promise<IPreset> => reqs.put("/v1/internal/creator/encodes/presets", p),
  getAllProfiles: (): Promise<IEncodeFormat[]> => reqs.get("/v1/internal/creator/encodes/profiles")
}

export const Creator = {
  getStats: (): Promise<ICreatorStats> => reqs.get("/v1/internal/creator/stats")
}

export const User = {
  getUser: (): Promise<IUser> => reqs.get("/v1/internal/people/user")
}