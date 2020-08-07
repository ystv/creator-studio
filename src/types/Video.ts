export interface IVideo {
  id: number;
  SeriesID: number;
  name: string;
  url: string;
  description: string;
  thumbnail: string;
  duration: number;
  views: number;
  tags: string[];
  seriesPosition: number;
  status: string;
  preset: string;
  broadcastDate: Date;
  createdAt: Date;
  owner: string;
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
