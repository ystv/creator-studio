import React from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";

const uppy = Uppy({
  meta: { type: "video" },
  restrictions: { maxNumberOfFiles: 1 },
  autoProceed: true,
});

uppy.use(Tus, {
  endpoint: "https://upload.ystv.co.uk/files",
  resume: true,
  autoretry: true,
  retryDelays: [0, 1000, 3000, 5000],
});

uppy.on("complete", (result) => {
  const url = result.successful[0].uploadURL;
  console.log(url);
});

const Uploader = () => <Dashboard uppy={uppy} />;

Uploader.displayName = "UppyPageComponent";
export default Uploader;
