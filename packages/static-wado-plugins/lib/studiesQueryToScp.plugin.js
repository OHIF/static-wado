const ConfigPoint = require("config-point");
const dcmjsDimse = require("dcmjs-dimse");
const { aeConfig } = require("@ohif/static-wado-util");

const { Client } = dcmjsDimse;
const { CFindRequest } = dcmjsDimse.requests;
const { Status } = dcmjsDimse.constants;

const { studiesQueryByIndex } = ConfigPoint.register({
  studiesQueryByIndex: {
    generator: (params) => {
      const { queryAe, callingAe, scpAe } = params;
      if (!queryAe) throw new Error("queryAe not specified");
      const aeData = aeConfig[queryAe];
      if (!aeData) throw new Error(`No data for aeConfig.${queryAe} is configured in ${Object.keys(aeConfig)}`);
      const { host, port } = aeData;

      return function query(queryKeys) {
        const client = new Client();
        const request = CFindRequest.createStudyFindRequest(queryKeys);
        return new Promise((resolve, reject) => {
          request.on("response", (response) => {
            if (response.getStatus() === Status.Pending && response.hasDataset()) {
              console.log(response.getDataset());
              resolve(response.getDataset());
            } else {
              console.log("Unknown status", response.getStatus());
            }
          });
          client.addRequest(request);
          client.on("networkError", (e) => {
            console.log("Network error: ", e);
            reject(e);
          });
          client.send(host, port, callingAe || scpAe, queryAe);
        });
      };
    },
  },
});

module.exports = studiesQueryByIndex;
