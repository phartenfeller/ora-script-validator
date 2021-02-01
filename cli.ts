import arg from 'arg';
import main from './index';

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
  main(options.file, options.loglevel);
};

export { cli };
