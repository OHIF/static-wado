import assert from "must";

import { dicomWebServerConfig } from "../lib/index.mjs";

describe("@ohif/static-wado-webserver", () => {
  describe("dicomWebServerConfig", () => {
    it("has default values", () => {
      assert(dicomWebServerConfig.rootDir).must.eql("~/dicomweb");
    });
  });
});
