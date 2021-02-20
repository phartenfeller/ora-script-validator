import fs from 'fs';
import path from 'path';
import { logError, logInfo } from '../util/logger';

const genConfig = (): void => {
  const writePath = path.join(process.cwd(), 'orasv.config.json');

  if (fs.existsSync(writePath)) {
    logError(`A config already exists at "${writePath}". Aborting...`);
    process.exit(1);
  }

  import('./defaultConfig.js').then((config) => {
    try {
      fs.writeFileSync(writePath, JSON.stringify(config.default, null, 2));
    } catch (err) {
      logError(`Error creating config: ${err}`);
      process.exit(1);
    }
    logInfo(`Config file written to "${writePath}".`);
    // exit aftre generarion -> don't run validatior
    process.exit(0);
  });
};

export default genConfig;
