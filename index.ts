import arg from 'arg';
import { version } from './package.json';
import main from './src/main';
import { logInfo } from './src/util/logger';
import outputErrors from './src/util/outputErrors';

// Codes at: https://nodejs.org/api/process.html#process_exit_codes
const INVALID_ARGUMEMT = 8;

interface options {
  file: string;
  loglevel: number;
  version: boolean;
}

const parseArgumentsIntoOptions = (rawArgs: string[]): options => {
  const args = arg(
    {
      '--loglevel': Number,
      '--version': Boolean,

      // aliases
      '-l': '--loglevel',
      '-v': '--version',
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    file: args._[0],
    loglevel: args['--loglevel'] || 2,
    version: args['--version'] || false,
  };
};

const logVersion = (logVersion: boolean) => {
  if (logVersion) {
    console.log(version);
    process.exit(0);
  }
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
  logVersion(options.version);
  validateInputs(options);
  const errors = main(options.file, options.loglevel);

  if (errors.length > 0) {
    outputErrors(errors);
    process.exit(1);
  } else {
    logInfo(`✅ No errors found`);
  }
};

export { cli };
