import { IVideo } from "./Video";

export interface IPlaylist {
  playlistID: number;
  name: string;
  description: string;
  thumbnail: string;
  status: string;
  createdAt: Date;
  createdBy: number;
  videos: IVideo[];
}
