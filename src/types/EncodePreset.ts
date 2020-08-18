import IEncodeFormat from "./EncodeProfile";

interface IPreset {
  id: number;
  name: string;
  description: string;
  formats?: IEncodeFormat[];
}

export default IPreset;
