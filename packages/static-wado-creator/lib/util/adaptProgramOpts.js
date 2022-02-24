module.exports = function adaptProgramOpts(programOpts) {
  const {
    maximumInlinePublicLength,
    maximumInlinePrivateLength,
    group: isGroup,
    instances: isInstanceMetadata,
    deduplicate: isDeduplicate,
    study: isStudyData,
    clean: isClean,
    recompress,
    contentType,
    colourContentType,
    dir: rootDir,
    pathDeduplicated,
    pathInstances,
    removeDeduplicatedInstances,
    verbose,
  } = programOpts;

  return {
    maximumInlinePublicLength,
    maximumInlinePrivateLength,
    isGroup,
    isInstanceMetadata,
    isDeduplicate,
    isStudyData,
    isClean,
    recompress,
    contentType,
    colourContentType,
    rootDir,
    pathDeduplicated,
    pathInstances,
    removeDeduplicatedInstances,
    verbose,
  };
};
