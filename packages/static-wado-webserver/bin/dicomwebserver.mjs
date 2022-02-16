import DicomWebServer, { dicomWebServerConfig } from "../lib/index.mjs";

import configureProgram from "../lib/program/index.mjs";

const defaults = {
  ...dicomWebServerConfig,
  helpShort: "dicomwebserver",
  helpDescription:
    "Serve up the static wado files and optionally a web client as a web server on the local machine.",
};

// Configure program commander
configureProgram(defaults);

const app = DicomWebServer(defaults);
app.listen();
