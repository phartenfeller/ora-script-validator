import Loglevel from '../types/Loglevel';

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
    console.log('[debug]', message);
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
