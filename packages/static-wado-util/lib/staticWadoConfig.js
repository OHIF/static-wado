const { ConfigPoint } = require("config-point");

const { staticWadoConfig } = ConfigPoint.register({
  staticWadoConfig: {
    rootDir: "~/dicomweb",
    pathDeduplicated: "deduplicated",
    configurationFile: ["./static-wado.json5", "~/static-wado.json5"],
    recompressType: "",
    staticWadoAE: "STATICWADO",
    verbose: false,
    studyQuery: "studiesQueryByIndex",
    staticWadoAe: "DICOMWEB",
  },
});

module.exports = staticWadoConfig;
