import { UppyFile } from "@uppy/core";
import { Token } from "./auth";

export const TusConfig = {
  endpoint: `${process.env.REACT_APP_UPLOAD_ENDPOINT}`,
  resume: true,
  headers: {
    authorization: `Bearer ${Token.getToken()}`,
},
  autoretry: true,
  retryDelays: [0, 1000, 3000, 5000],
};

export const getKey = (file: UppyFile): string => {
  if (!file.response || !file.response.uploadURL) {
    return "";
  }
  // The reason why it is cursed in the first place is since the return URL is designed
  // for retrieving the image from tusd and not s3 so we modify the string for s3
  return file.response.uploadURL.substring(
    file.response.uploadURL.lastIndexOf("/") + 1,
    file.response.uploadURL.lastIndexOf("+")
  );
};
