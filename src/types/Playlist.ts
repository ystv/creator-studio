import { IVideo } from "./Video";

export interface IPlaylist {
  playlistID: number;
  name: string;
  description: string;
  thumbnail: string; // null-able in web-api
  status: string;
  createdAt: Date;
  createdBy: number;
  videos: IVideo[];
}

export interface IPlaylistNew {
  id?: number;
  name: string;
  description: string;
  thumbnail: string;
  status: string;
  videos: number[];
}
