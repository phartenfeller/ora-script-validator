import fs from 'fs';
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
import validateLink from './src/validators/linkValidator';
import tableExistanceValidator from './src/validators/tableExistanceValidator';

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
    const fullPath = path.format(currentFile);
    const matches = indexFile(fullPath);

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
          case IndexType.ReadGrant:
            tableExistanceValidator(match.identifier);
            break;
          default:
            logError(`Unkown index type: ${match.type}`);
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
const main = (relPath: string, level: Loglevel): ErrorList => {
  initLogger(level);

  const parsedPath = path.parse(relPath);
  const exists = fs.existsSync(path.format(parsedPath));
  if (!exists) {
    logError(`Can not locate file: ${relPath}`);
    process.exit(1);
  }
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

  logDebug(`Tables: ${JSON.stringify(getTables())}`);

  return errors;
};

export default main;
