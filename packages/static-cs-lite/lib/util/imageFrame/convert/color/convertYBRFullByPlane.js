/* eslint-disable no-plusplus */

const assertArrayDivisibility = require("./assertArrayDivisibility");

function converter(imageFrame, rgbaBuffer) {
  if (!assertArrayDivisibility(imageFrame, 3, ["decodeRGB: ybrBuffer must not be undefined", "decodeRGB: ybrBuffer length must be divisble by 3"])) {
    return;
  }

  const numPixels = imageFrame.length / 3;

  let rgbaIndex = 0;

  let yIndex = 0;

  let cbIndex = numPixels;

  let crIndex = numPixels * 2;

  for (let i = 0; i < numPixels; i++) {
    const y = imageFrame[yIndex++];
    const cb = imageFrame[cbIndex++];
    const cr = imageFrame[crIndex++];

    rgbaBuffer[rgbaIndex++] = y + 1.402 * (cr - 128); // red
    rgbaBuffer[rgbaIndex++] = y - 0.34414 * (cb - 128) - 0.71414 * (cr - 128); // green
    rgbaBuffer[rgbaIndex++] = y + 1.772 * (cb - 128); // blue
    rgbaBuffer[rgbaIndex++] = 255; // alpha
  }
}

module.exports = converter;
