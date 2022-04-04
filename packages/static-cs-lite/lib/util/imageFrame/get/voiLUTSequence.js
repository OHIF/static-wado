function hasProperty(voiLUT, propertyName) {
  return propertyName in voiLUT;
}

/**
 * It get/adapt a voiLutSequence from the given metadataVoiLUTSequence.
 * It can be used for voiLUT and modalityVoiLUT
 *
 * @see https://dicom.innolitics.com/ciods/cr-image/modality-lut/00283000
 *
 * @param {Object[]} metadataVoiLUTSequence
 * @param {Number[]} metadataVoiLUTSequence[].LUTDescriptor array containing lut descriptor.
 * @param {Number[]} metadataVoiLUTSequence[].LUTData array containing lut data.
 *
 */
function voiLUTSequence(metadataVoiLUTSequence = []) {
  let response;

  for (const voiLUT of metadataVoiLUTSequence) {
    if (!hasProperty(voiLUT, "lut") || !hasProperty(voiLUT, "firstValueMapped") || !hasProperty(voiLUT, "numBitsPerEntry")) {
      const { LUTDescriptor, LUTData = [] } = voiLUT;

      if (!LUTDescriptor || !LUTData) {
        console.log(`Missing lut properties for voiLUT ${voiLUT}`);
      } else {
        if (!response) {
          response = [];
        }

        const [, firstValueMapped, numBitsPerEntry] = LUTDescriptor;
        const lut = [...LUTData];

        // shape of cs
        const lutObj = {
          firstValueMapped,
          numBitsPerEntry,
          lut,
        };

        response.push(lutObj);
      }
    }
  }

  return response;
}

module.exports = voiLUTSequence;
