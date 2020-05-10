import React from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";
import GoogleDrive from "@uppy/google-drive";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "../styles/uploader.css";

const uppy = Uppy({
  restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ["video/*"] },
  autoProceed: true,
})
  .use(Dashboard, {
    trigger: ".UppyModalOpenerBtn",
    inline: true,
    target: ".DashboardContainer",
    replaceTargetContent: true,
    showProgressDetails: true,
    note: "Please double check that you have exported correctly.",
    height: 470,
    metaFields: [
      { id: "name", name: "Name", placeholder: "Production name" },
      {
        id: "description",
        name: "Description",
        placeholder: "Brief description",
      },
    ],
    browserBackButtonClose: true,
  })
  .use(GoogleDrive, {
    target: Dashboard,
    companionUrl: "https://companion.ystv.co.uk",
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

const Uploader = () => <Dashboard uppy={uppy} />;

Uploader.displayName = "UppyPageComponent";
export default Uploader;
