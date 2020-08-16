import React from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";
import GoogleDrive from "@uppy/google-drive";
import Dropbox from "@uppy/dropbox";
import OneDrive from "@uppy/onedrive";
import Url from "@uppy/url";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const Uploader = () => {
  const uppy = Uppy({
    restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ["video/*"] },
    autoProceed: true,
  }).use(Tus, {
    endpoint: `${process.env.REACT_APP_UPLOAD_ENDPOINT}`,
    resume: true,
    withCredentials: true,
    autoretry: true,
    retryDelays: [0, 1000, 3000, 5000],
  });

  uppy.on("complete", (result) => {
    console.log(
      result.successful[0].response?.uploadURL?.substring(
        result.successful[0].response?.uploadURL?.lastIndexOf("/") + 1
      )
    ); // contains the object key
    console.log("failed files:", result.failed);
  });

  return (
    <Dashboard
      uppy={uppy}
      plugins={["GoogleDrive", "Dropbox", "OneDrive", "Url"]}
      showProgressDetails={true}
      theme="auto"
    />
  );
};

export default Uploader;
