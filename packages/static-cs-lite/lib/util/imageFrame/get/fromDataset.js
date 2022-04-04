const getPaletteColor = require("./paletteColor");
const getVoiLUTSequence = require("./voiLUTSequence");

/**
 * Get image frame from dataset
 *
 * @param {*} dataSet naturalized (by dcmjs) data set
 * @param {*} decodedPixelData
 * @returns image frame
 */
function fromDataset(dataSet, decodedPixelData) {
  const bluePaletteColorLookupTableData = getPaletteColor(dataSet.BluePaletteColorLookupTableData, dataSet.BluePaletteColorLookupTableDescriptor);
  const greenPaletteColorLookupTableData = getPaletteColor(dataSet.GreenPaletteColorLookupTableData, dataSet.GreenPaletteColorLookupTableDescriptor);
  const redPaletteColorLookupTableData = getPaletteColor(dataSet.RedPaletteColorLookupTableData, dataSet.RedPaletteColorLookupTableDescriptor);
  const voiLUTSequence = getVoiLUTSequence(dataSet.VOILUTSequence);
  const modalityLUTSequence = getVoiLUTSequence(dataSet.ModalityLUTSequence);

  return {
    samplesPerPixel: dataSet.SamplesPerPixel,
    photometricInterpretation: dataSet.PhotometricInterpretation,
    planarConfiguration: dataSet.PlanarConfiguration,
    rows: dataSet.Rows,
    columns: dataSet.Columns,
    bitsAllocated: dataSet.BitsAllocated,
    bitsStored: dataSet.BitsStored,
    pixelRepresentation: dataSet.PixelPresentation, // 0 = unsigned,
    smallestPixelValue: dataSet.SmallestImagePixelValue,
    largestPixelValue: dataSet.LargestImagePixelValue,
    bluePaletteColorLookupTableData,
    bluePaletteColorLookupTableDescriptor: dataSet.BluePaletteColorLookupTableDescriptor,
    greenPaletteColorLookupTableData,
    greenPaletteColorLookupTableDescriptor: dataSet.GreenPaletteColorLookupTableDescriptor,
    redPaletteColorLookupTableData,
    redPaletteColorLookupTableDescriptor: dataSet.RedPaletteColorLookupTableDescriptor,
    pixelData: decodedPixelData,
    voiLUTSequence,
    modalityLUTSequence,
  };
}

module.exports = fromDataset;
