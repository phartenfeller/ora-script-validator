import fs from 'fs';
import path from 'path';
import checkConfig from './config/checkConfig';
import indexFile from './fileIndexer';
import { addSeqDef, addTableDef, getErrors, getTables } from './state';
import ErrorList from './types/ErrorList';
import IndexType from './types/IndexType';
import { logDebug, logError } from './util/logger';
import validateLink from './validators/linkValidator';
import seqExistanceValidator from './validators/seqExistanceValidator';
import tableExistanceValidator from './validators/tableExistanceValidator';

let baseDir = ' ';
let TFI: boolean | undefined;

interface validateFileParams {
  currentFile: path.ParsedPath;
  dir: string;
}

/**
 * Validates a file for any errors
 */
const validateFile = ({ currentFile, dir }: validateFileParams) => {
  try {
    const fullPath = path.format(currentFile);
    const matches = indexFile(fullPath, TFI);

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
          case IndexType.AlterTable:
          case IndexType.DMLStatement:
            tableExistanceValidator({
              table: match.identifier,
              callingFile: match.callingFile,
              match: match.match,
            });
            break;
          case IndexType.CreateSequence:
            addSeqDef(match.identifier);
            break;
          case IndexType.SeqNextval:
            seqExistanceValidator({
              seq: match.identifier,
              callingFile: match.callingFile,
              match: match.match,
            });
            break;
          default:
            logError(`Unkown index type: ${match.type}`);
        }
      });
    }
  } catch (err) {
    logError(err);
  }
};

interface mainArgs {
  relPath: string;
  traceFileIndexing: boolean;
  configPath?: string;
}

/**
 * Main function that starts the validation
 */
const main = ({
  relPath,
  traceFileIndexing = false,
  configPath = './orasv.config.json',
}: mainArgs): ErrorList => {
  TFI = traceFileIndexing;

  checkConfig(configPath);

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

  logDebug(`Tables: ${JSON.stringify(getTables())}`);

  return errors;
};

export default main;
