/* eslint-disable no-plusplus, no-bitwise */

/**
 * Returns palette color lut array.
 * In case colorLutData has InlineBinary value it decodes the binary using lutDescriptor.
 *
 * @param {Object} colorLutData  color look up table data
 * @param {Array} colorLutDescriptor color look up table descriptor
 * @returns
 */
function paletteColor(colorLutData, colorLutDescriptor) {
  if (!colorLutDescriptor || !colorLutData) {
    return;
  }
  const numLutEntries = colorLutDescriptor[0];
  const bits = colorLutDescriptor[2];

  const typedArrayToPaletteColorLUT = (typedArray) => {
    const lut = [];

    if (bits === 16) {
      let j = 0;
      for (let i = 0; i < numLutEntries; i++) {
        lut[i] = (typedArray[j++] + typedArray[j++]) << 8;
      }
    } else {
      for (let i = 0; i < numLutEntries; i++) {
        lut[i] = typedArray[i];
      }
    }
    return lut;
  };

  if (colorLutData.palette) {
    return colorLutData.palette;
  }

  if (colorLutData.InlineBinary) {
    try {
      const paletteStr = colorLutData.InlineBinary;

      const paletteBinaryStr = Buffer.from(paletteStr, "base64").toString("binary");

      const paletteTypedArray = Uint8Array.from(paletteBinaryStr, (c) => c.charCodeAt(0));

      return typedArrayToPaletteColorLUT(paletteTypedArray);
    } catch (e) {
      console.log("Couldn't decode", colorLutData.InlineBinary, e);
      return undefined;
    }
  }

  throw new Error(`No data found for ${colorLutData} palette`);
}

module.exports = paletteColor;
