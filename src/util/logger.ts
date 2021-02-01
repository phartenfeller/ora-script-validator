import Loglevel from '../types/Loglevel';

const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

let userLevel: Loglevel = Loglevel.off;

const initLogger = (level: Loglevel): void => {
  userLevel = level;
};

const logMsg = (message: string, level: Loglevel): void => {
  if (level <= userLevel) {
    if (level === Loglevel.error) {
      console.error(message);
    } else {
      console.log(message);
    }
  }
};

const logDebug = (message: string): void => {
  if (userLevel >= Loglevel.debug) {
    console.log(`[${YELLOW}debug${RESET}]`, message);
  }
};

const logInfo = (message: string): void => {
  if (userLevel >= Loglevel.info) {
    console.log(message);
  }
};

const logError = (message: string): void => {
  if (userLevel >= Loglevel.error) {
    console.error(message);
  }
};

export { initLogger, logMsg, logDebug, logInfo, logError };
