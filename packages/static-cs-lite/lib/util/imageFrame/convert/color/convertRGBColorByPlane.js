/* eslint-disable no-plusplus */
const assertArrayDivisibility = require("./assertArrayDivisibility");

function converter(imageFrame, rgbaBuffer) {
  if (!assertArrayDivisibility(imageFrame, 3, ["decodeRGB: rgbBuffer must not be undefined", "decodeRGB: rgbBuffer length must be divisble by 3"])) {
    return;
  }

  const numPixels = imageFrame.length / 3;

  let rgbaIndex = 0;

  let rIndex = 0;

  let gIndex = numPixels;

  let bIndex = numPixels * 2;

  for (let i = 0; i < numPixels; i++) {
    rgbaBuffer[rgbaIndex++] = imageFrame[rIndex++]; // red
    rgbaBuffer[rgbaIndex++] = imageFrame[gIndex++]; // green
    rgbaBuffer[rgbaIndex++] = imageFrame[bIndex++]; // blue
    rgbaBuffer[rgbaIndex++] = 255; // alpha
  }
}

module.exports = converter;
