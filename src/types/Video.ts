export interface IVideoMeta {
  id: number;
  seriesID: number;
  name: string;
  url: string;
  duration: number;
  views: number;
  tags: string[];
  status: string;
  broadcastDate: Date;
  createdAt: Date;
}

export interface IVideo extends IVideoMeta {
  description: string;
  thumbnail: string;
  createdByID: number;
  createdByNick: string;
  updatedByID?: number;
  updatedByNick?: string;
  deletedByID?: number;
  deletedByNick?: string;
  files: IVideoFile[];
}

export interface IVideoFile {
  id: number;
  uri: string;
  encodeFormat: string;
  status: string;
  size: number;
  mimeType: string;
}
