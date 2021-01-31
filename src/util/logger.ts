import Loglevel from '../types/Loglevel';

let userLevel: Loglevel | undefined;

const initLogger = (level: Loglevel): void => {
  userLevel = level;
  console.log('level', level);
};

const logMsg = (message: string, level: Loglevel): void => {
  if (!userLevel) {
    console.error(`Logger not set up`);
    process.exit(1);
  }

  if (level <= userLevel) {
    if (level === Loglevel.error) {
      console.error(message);
    } else {
      console.log(message);
    }
  }
};

const logDebug = (message: string): void => {
  if (!userLevel) {
    console.error(`Logger not set up`);
    process.exit(1);
  }

  if (userLevel >= Loglevel.debug) {
    console.log(message);
  }
};

const logInfo = (message: string): void => {
  if (!userLevel) {
    console.error(`Logger not set up`);
    process.exit(1);
  }

  if (userLevel >= Loglevel.info) {
    console.log(message);
  }
};

const logError = (message: string): void => {
  if (!userLevel) {
    console.error(`Logger not set up`);
    process.exit(1);
  }

  if (userLevel >= Loglevel.error) {
    console.error(message);
  }
};

export { initLogger, logMsg, logDebug, logInfo, logError };
