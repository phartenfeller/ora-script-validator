import Loglevel from '../../src/types/Loglevel';
import { initLogger } from '../../src/util/logger';

const initTestConditions = () => {
  initLogger(Loglevel.error);
};

export default initTestConditions;
