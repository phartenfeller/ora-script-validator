/* eslint-disable no-console */
import main from './src/main';
import Loglevel from './src/types/Loglevel';
import { initLogger } from './src/util/logger';
import outputErrors from './src/util/outputErrors';

initLogger(Loglevel.debug);

//const errors = main('./db_objects/install_lct.sql', Loglevel.debug);
const errors = main('./test/sequences/success/install.sql');

if (errors.length > 0) {
  outputErrors(errors);
} else {
  console.log(`✅ No errors found`);
}
