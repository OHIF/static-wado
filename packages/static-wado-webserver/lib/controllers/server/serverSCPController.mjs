import { aeConfig } from "@ohif/static-wado-util";
import { findMove } from "../../subscribers/dimse/operations/cmove.mjs";

export default function serverSCPFallbackController(
  params,
  { studyInstanceUIDPattern, seriesInstanceUIDPattern, sopInstanceUIDPattern } = {
    studyInstanceUIDPattern: "",
    seriesInstanceUIDPattern: "",
    sopInstanceUIDPattern: "",
  },
  bulk = false
) {
  return async (req, res, next) => {
    try {
      const { proxyAe, staticWadoAE: destAe } = params;

      if (!proxyAe) throw new Error("proxyAe not specified");
      const proxyAeData = aeConfig[proxyAe];

      if (!proxyAeData) throw new Error(`No data for aeConfig.${proxyAe} is configured in ${Object.keys(aeConfig)}`);
      const { host, port } = proxyAeData;

      const proxyConfig = {
        host,
        port,
        aeTittle: proxyAe,
      };

      const requestOptions = {
        bulk,
        destAETittle: destAe,
        StudyInstanceUID: req.params[studyInstanceUIDPattern],
        SeriesInstanceUID: req.params[seriesInstanceUIDPattern],
        SOPInstanceUID: req.params[sopInstanceUIDPattern],
      };

      if (bulk) {
        const [findResults] = await findMove(proxyConfig, requestOptions);

        res.status(200).send(findResults);

        return;
      }
    } catch (e) {
      console.log(`Get data from server failed${e}`);
    }

    next();
  };
}
