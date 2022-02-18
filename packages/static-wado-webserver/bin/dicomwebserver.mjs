#!/usr/bin/env node

import DicomWebServer, { dicomWebServerConfig } from "../lib/index.mjs";

import configureProgram from "../lib/program/index.mjs";

// Dynamically include the required imports
const defaults = Object.create(dicomWebServerConfig);

// Configure program commander
configureProgram(defaults);

DicomWebServer(defaults).then((value) => value.listen());
