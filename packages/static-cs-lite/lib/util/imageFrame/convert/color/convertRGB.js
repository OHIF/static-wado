const convertRGBColorByPixel = require("./convertRGBColorByPixel");
const convertRGBColorByPlane = require("./convertRGBColorByPlane");

function convertRGB(imageFrame, rgbaBuffer) {
  const { planarConfiguration, pixelData } = imageFrame;
  if (planarConfiguration === 0) {
    convertRGBColorByPixel(pixelData, rgbaBuffer);
  } else {
    convertRGBColorByPlane(pixelData, rgbaBuffer);
  }
}

module.exports = convertRGB;
