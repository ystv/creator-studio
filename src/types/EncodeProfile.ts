interface IEncodeFormat {
  id: number;
  name: string;
  description: string;
  mimeType: string;
  mode: string;
  width: number;
  height: number;
  arguments: string;
  watermarked: boolean;
}

export default IEncodeFormat;
