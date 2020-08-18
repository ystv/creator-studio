interface IEncodeFormat {
  id: number;
  name: string;
  description: string;
  mimeType: string;
  mode: string;
  width: number;
  height: number;
  arguments: string;
  watermarked: number;
}

export default IEncodeFormat;
