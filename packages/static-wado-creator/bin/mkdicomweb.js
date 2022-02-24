#!/usr/bin/env node

const { main, staticWadoConfig } = require("../lib");
const { configureProgram } = require("../lib/program");
const adaptProgramOpts = require("../lib/util/adaptProgramOpts.js");

const defaults = {
  ...staticWadoConfig,
  isStudyData: true,
  isGroup: true,
  argumentsRequired: ["input"],
  helpShort: "mkdicomweb",
  helpDescription:
    "Make DICOMweb query and metadata from binary Part 10 DICOM files.  Does a full read of\n" +
    "deduplicated files each time a study instance UID is found, and only updates those studies\n" +
    "having at least one ",
};

// Configure program commander
const program = configureProgram(defaults);
const configuration = adaptProgramOpts(program.opts());

main(configuration, program.args).then(() => {
  console.log("done");
});
