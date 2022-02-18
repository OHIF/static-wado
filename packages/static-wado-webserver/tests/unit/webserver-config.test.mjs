import must from "must";

import ConfigPoint from "config-point";
import { dicomWebServerConfig, importPlugin } from "../../lib/index.mjs";

import "regenerator-runtime";

describe("@ohif/static-wado-webserver", () => {
  beforeAll(() => importPlugin("readSeriesIndex"));

  const params = { rootDir: ".." };

  it("has default values", () => {
    must(ConfigPoint.getConfig(dicomWebServerConfig)).not.be.undefined();
    must(ConfigPoint.getConfig("readSeriesIndex")).not.be.undefined();
  });

  it("loaded readSeriesIndex", async () => {
    const { generator } = await importPlugin("readSeriesIndex");
    const readSeriesIndex = generator(params);
    must(readSeriesIndex).be.function();
  });

  it("loaded studiesQueryByIndex", async () => {
    const { generator } = await importPlugin("studiesQueryByIndex");
    const queryFunction = generator(params);
    must(queryFunction).be.function();
  });
});
