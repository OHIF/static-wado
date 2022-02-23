const { program, Argument } = require("commander");
const loadConfiguration = require("../loadConfiguration");

function configureBaseProgram(configuration) {
  const { helpDescription, helpShort } = configuration;

  program.name(helpShort).configureHelp({ sortOptions: true }).addHelpText("beforeAll", helpDescription).addHelpCommand();

  return program;
}

/**
 * Configure static-wado commander program. Ideally it should be called just once.
 * Used by static-wado packages command commands.
 *
 * @param {*} configuration Configuration object from command level
 * @returns Program object
 */
function configureProgram(configuration) {
  const { argumentsRequired = [], optionsRequired = [], argumentsList = [], optionsList = [], packageJson = {} } = configuration;

  program.version(packageJson.version);

  const currentProgram = configureBaseProgram(configuration);

  // program command options
  argumentsRequired.forEach((argName) => {
    argumentsList.forEach((argObject) => {
      if (argObject.key.includes(argName)) {
        program.addArgument(new Argument(argObject.key, argObject.description));
      }
    });
  });

  // iterate over option list and set to program
  optionsList.forEach(({ key, description, defaultValue, choices }) => {
    const option = currentProgram.createOption(key, description);

    option.default(defaultValue);

    if (optionsRequired.includes(option.short) || optionsRequired.includes(option.long)) {
      option.makeOptionMandatory();
    }

    if (Array.isArray(choices)) {
      option.choices(choices);
    }

    currentProgram.addOption(option);
  });

  currentProgram.parse();

  currentProgram.loadConfiguration = () => loadConfiguration(configuration.configurationFile);
  return currentProgram;
}

exports.configureProgram = configureProgram;
exports.program = program;
