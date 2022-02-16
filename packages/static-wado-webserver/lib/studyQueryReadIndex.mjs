import ConfigPoint from "config-point";

const { studyQueryReadIndex } = ConfigPoint.register({
  studyQueryReadIndex: {
    createWebQuery(directory,params) {
      
      return async function webQuery(req, res, next) {
        console.log("Configured to read from static file location", req.path);
        next();
      }
    },
  },
});

export default studyQueryReadIndex;
