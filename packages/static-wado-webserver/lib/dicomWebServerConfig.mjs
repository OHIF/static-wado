import ConfigPoint from "config-point";
import StaticCreator from "@ohif/static-wado-creator";

const { staticWadoConfig } = StaticCreator;

const { dicomWebServerConfig } = ConfigPoint.register({
  dicomWebServerConfig: {
    configBase: staticWadoConfig,
    studyQuery: "studyQueryReadIndex",
    clientDir: "~/ohif",
  },
});

export default dicomWebServerConfig;
