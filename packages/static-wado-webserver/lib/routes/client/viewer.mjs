import { htmlMap } from "../../adapters/requestAdapters.mjs";
import staticController from "../../controllers/client/staticController.mjs";

export default function setViewerRoutes(routerExpress, params, dir) {
  routerExpress.get("/viewer", htmlMap);
  routerExpress.use(staticController(dir));
}
