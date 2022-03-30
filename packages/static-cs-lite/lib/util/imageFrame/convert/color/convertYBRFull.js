const convertYBRFullByPixel = require("./convertYBRFullByPixel");
const convertYBRFullByPlane = require("./convertYBRFullByPlane");

function convertYBRFull(imageFrame, rgbaBuffer) {
  const { planarConfiguration, pixelData } = imageFrame;

  if (planarConfiguration === 0) {
    convertYBRFullByPixel(pixelData, rgbaBuffer);
  } else {
    convertYBRFullByPlane(pixelData, rgbaBuffer);
  }
}

module.exports = convertYBRFull;
