import ConfigPoint from "config-point";
import StaticCreator from "@ohif/static-wado-creator";

const { staticWadoConfig } = StaticCreator;

/**
 * Defines the basic configuration values for the dicomwebserver component.  See the README for more details.
 */
const { dicomWebServerConfig } = ConfigPoint.register({
  dicomWebServerConfig: {
    configBase: staticWadoConfig,
    studyQuery: "studyQueryReadIndex",
    clientDir: "~/ohif",
  },
});

export default dicomWebServerConfig;
