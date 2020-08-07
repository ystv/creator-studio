import { IVideoFile } from "./Video";

export interface IPlaylist {
  playlistID: number;
  name: string;
  description: string; // null-able in web-api
  thumbnail: string; // null-able in web-api
  status: string;
  createdAt: Date;
  createdBy: number;
  files?: IVideoFile[];
}
