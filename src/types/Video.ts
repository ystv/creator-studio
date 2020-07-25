export interface VideoData {
  videoID: number;
  seriesID: number;
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
  files: videoFiles[];
}

export interface videoFiles {
  id: number;
  uri: string;
  encodeFormat: string;
  status: string;
  size: number;
  mimeType: string;
}
