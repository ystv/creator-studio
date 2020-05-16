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
import "../styles/uploader.css";

const uppy = Uppy({
  restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ["video/*"] },
  autoProceed: true,
})
  .use(GoogleDrive, {
    companionUrl: "https://upload.ystv.co.uk/companion",
  })
  .use(Dropbox, {
    companionUrl: "https://upload.ystv.co.uk/companion",
  })
  .use(OneDrive, {
    companionUrl: "https://upload.ystv.co.uk/companion",
  })
  .use(Url, {
    companionUrl: "https://upload.ystv.co.uk/companion",
  })
  .use(Tus, {
    endpoint: "https://upload.ystv.co.uk/files/",
    resume: true,
    autoretry: true,
    retryDelays: [0, 1000, 3000, 5000],
  });

uppy.on("complete", (result) => {
  console.log("successful files:", result.successful);
  console.log("failed files:", result.failed);
});

const Uploader = () => (
  <Dashboard
    uppy={uppy}
    plugins={["GoogleDrive", "Dropbox", "OneDrive", "Url"]}
    showProgressDetails={true}
    theme="auto"
    height="30rem"
    width="30rem"
    metaFields={[
      { id: "title", name: "Title", placeholder: "Video title" },
      {
        id: "description",
        name: "Description",
        placeholder: "Video description",
      },
    ]}
    note="lol"
  />
);

Uploader.displayName = "UppyPageComponent";
export default Uploader;
