import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { getKey, TusConfig } from "../../api/upload";

const Uploader = () => {
  const uppy = Uppy({
    restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ["video/*"] },
    autoProceed: true,
  }).use(Tus, TusConfig);

  uppy.on("complete", (result) => {
    console.log("file key: ", getKey(result.successful[0])); // contains the object key
    console.log("failed files:", result.failed);
  });

  return <Dashboard uppy={uppy} showProgressDetails={true} theme="auto" />;
};

export default Uploader;
