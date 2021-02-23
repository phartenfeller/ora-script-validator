/* eslint-disable no-console */
import arg from 'arg';
import { version } from './package.json';
import genConfig from './src/config/genConfig';
import main from './src/main';
import { initLogger, logInfo } from './src/util/logger';
import outputErrors from './src/util/outputErrors';

// Codes at: https://nodejs.org/api/process.html#process_exit_codes
const INVALID_ARGUMEMT = 8;

interface options {
  file: string;
  loglevel: number;
  version: boolean;
  traceFileIndexing: boolean;
  genConfig: boolean;
  configPath: string | undefined;
}

const parseArgumentsIntoOptions = (rawArgs: string[]): options => {
  const args = arg(
    {
      '--loglevel': Number,
      '--version': Boolean,
      '--traceFileIndexing': Boolean,
      '--genConfig': Boolean,
      '--config': String,

      // aliases
      '-l': '--loglevel',
      '-v': '--version',
      '-c': '--config',
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    file: args._[0],
    loglevel: args['--loglevel'] || 2,
    version: args['--version'] || false,
    traceFileIndexing: args['--traceFileIndexing'] || false,
    genConfig: args['--genConfig'] || false,
    configPath: args['--config'],
  };
};

const logVersion = () => {
  console.log(version);
  process.exit(0);
};

const validateInputs = (options: options) => {
  if (!options.file) {
    console.error(
      `Please specify a file to validate.\nFor example orasv install.sql`
    );
    process.exit(INVALID_ARGUMEMT);
  }
};

const cli = (args: string[]): void => {
  const options = parseArgumentsIntoOptions(args);

  initLogger(options.loglevel);

  if (options.version) {
    logVersion();
  } else if (options.genConfig) {
    genConfig();
  } else {
    validateInputs(options);
    const errors = main({
      relPath: options.file,
      traceFileIndexing: options.traceFileIndexing,
      configPath: options.configPath,
    });

    if (errors.length > 0) {
      outputErrors(errors);
      process.exit(1);
    } else {
      logInfo(`✅ No errors found`);
    }
  }
};

export { cli };
