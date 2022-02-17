import assert from "must";

import ConfigPoint from "config-point";
import { dicomWebServerConfig } from "../../lib/index.mjs";
import "../../lib/studyQueryReadIndex.mjs";

describe("@ohif/static-wado-webserver", () => {
  describe("dicomWebServerConfig", () => {
    it("has default values", () => {
      assert(dicomWebServerConfig.rootDir).must.eql("~/dicomweb");
      assert(dicomWebServerConfig.studyQuery).must.eql("studyQueryReadIndex");
    });
  });

  it("loadStudyQueryReadIndex plugin", () => {
    const studyQueryReadIndex = ConfigPoint.getConfig("studyQueryReadIndex");
    assert(studyQueryReadIndex).must.not.be.undefined();
    console.log("studyQueryReadIndex=", studyQueryReadIndex);
  });
});
