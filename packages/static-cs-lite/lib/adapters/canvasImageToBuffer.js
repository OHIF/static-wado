/**
 * Convert image from the given canvas to buffer object.
 *
 * @param {*} canvas that holds image to be converted.
 * @param {*} imageType target imageType.
 * @returns Buffer object
 */
function canvasImageToBuffer(canvas, imageType = "image/jpeg") {
  if (imageType === "image/jpeg") {
    const dataUrl = canvas.toDataURL(imageType, 1);
    const base64Data = dataUrl.replace(/^data:image\/(jpeg|png);base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    return buffer;
  }

  console.log(`Can't convert canvas to image type of ${imageType}`);
}

module.exports = canvasImageToBuffer;
