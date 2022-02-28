import notFoundController from "../../controllers/server/notFoundController.mjs";
import serverSCPFallbackController from "../../controllers/server/serverSCPController.mjs";
import staticController from "../../controllers/server/staticController.mjs";
import { qidoMap, otherJsonMap } from "../../adapters/requestAdapters.mjs";
import stowrsGenerator from "../../stowrs.mjs";

/**
 * Set studies (/studies) routes.
 *
 * @param {*} routerExpress root entry point for studies routes.
 * @param {*} params
 * @param {*} dir static files directory path
 */
export default function setRoutes(routerExpress, params, dir) {
  // adapt requests
  routerExpress.get(["/studies", "/studies/:studyUID/series", "/studies/:studyUID/series/:seriesUID/instances"], qidoMap);
  const stowrs = stowrsGenerator(params);
  routerExpress.post(["/studies", "/studies/:studyUID/series", "/studies/:studyUID/series/:seriesUID/instances"], stowrs);
  routerExpress.get("/studies/:studyUID/series/metadata", otherJsonMap);

  // Handle the QIDO queries
  routerExpress.use(staticController(dir));

  // fallback route to external SCP
  routerExpress.get("/studies/:studyUID/series/*.json.gz", serverSCPFallbackController(params, { studyInstanceUIDPattern: "studyUID" }, true));

  routerExpress.use("/studies/:studyUID/", notFoundController);
}
