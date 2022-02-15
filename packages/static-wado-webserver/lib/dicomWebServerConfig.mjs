// import {staticWadoConfig} from '@ohif/static-wado-creator';
// import { ConfigPoint } from 'config-point';
// import ConfigPointPkg from 'config-point';
// const { ConfigPoint } = ConfigPointPkg;

import ConfigPoint from "config-point";

const { dicomWebServerConfig } = ConfigPoint.register({
  dicomWebServerConfig: {
    baseConfig: "staticWadoConfig",
    studyQuery: "studyQueryReadIndex",
    clientDir: "~/ohif",
    rootDir: "~/dicomweb",
  },
});

export default dicomWebServerConfig;
