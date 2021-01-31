import path from 'path';
import indexFile from './src/fileIndexer';
import {
  addTableDef,
  anyErrorOccurred,
  getErrors,
  getTables,
} from './src/state';
import ErrorList from './src/types/ErrorList';
import IndexType from './src/types/IndexType';
import Loglevel from './src/types/Loglevel';
import { initLogger, logDebug, logError, logInfo } from './src/util/logger';
import fkValidator from './src/validators/fkValidator';
import validateLink from './src/validators/linkValidator';

let baseDir = ' ';

interface validateFileParams {
  currentFile: path.ParsedPath;
  dir: string;
}

/**
 * Validates a file for any errors
 */
const validateFile = ({ currentFile, dir }: validateFileParams) => {
  let fileContents: string | undefined;
  try {
    const matches = indexFile(path.format(currentFile));

    if (matches.length > 0) {
      matches.forEach((match) => {
        switch (match.type) {
          case IndexType.Link:
            const { exists, parsedPath } = validateLink({
              linkedFile: match.line,
              sourceFile: currentFile,
            });

            // recursively validate this file first before going on -> respect execution order
            if (exists && parsedPath) {
              validateFile({
                currentFile: parsedPath,
                dir,
              });
            }
            break;
          case IndexType.Table:
            addTableDef(match.identifier);
            break;
          case IndexType.ForeignKey:
            fkValidator(match.identifier);
            break;
          default:
            console.error(`Unkown index type: ${match.type}`);
        }
      });
    }
  } catch (err) {
    logError(`${err} Filecontents: ${fileContents || 'could not open file'}`);
  }
};

/**
 * Main function that starts the validation
 */
const main = (relPath: string, level?: Loglevel): ErrorList => {
  initLogger(level || Loglevel.info);

  const parsedPath = path.parse(relPath);
  baseDir = path.resolve(parsedPath.dir);

  validateFile({
    currentFile: parsedPath,
    dir: baseDir,
  });
  const errors = getErrors();
  if (anyErrorOccurred()) {
    logInfo(`Errors: ${JSON.stringify(errors)}`);
  } else {
    logInfo(`✅ No errors found`);
  }

  logDebug(`Tables: ${getTables()}`);

  return errors;
};

export default main;
