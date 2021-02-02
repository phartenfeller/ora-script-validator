import arg from 'arg';
import main from './src/main';
import { logInfo } from './src/util/logger';
import outputErrors from './src/util/outputErrors';

interface options {
  file: string;
  loglevel: number;
}

const parseArgumentsIntoOptions = (rawArgs: string[]): options => {
  const args = arg(
    {
      '--loglevel': Number,
      '-lly': '--loglevel',
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    file: args._[0],
    loglevel: args['--loglevel'] || 2,
  };
};

const validateInputs = (options: options) => {
  if (!options.file) {
    console.error(
      `Please specify a file to validate.\nFor example orasv install.sql`
    );
    process.exit(1);
  }
};

const cli = (args: string[]): void => {
  const options = parseArgumentsIntoOptions(args);
  validateInputs(options);
  const errors = main(options.file, options.loglevel);

  if (errors.length > 0) {
    outputErrors(errors);
  } else {
    logInfo(`✅ No errors found`);
  }
};

export { cli };
