import { ConfigPoint } from "config-point";

const { studyQueryReadIndex } = ConfigPoint.register({
  studyQueryReadIndex: {
    async webQuery(req, res, next) {
      console.log("Configured to read from static file location", req.path);
      next();
    },
  },
});

export default studyQueryReadIndex;
