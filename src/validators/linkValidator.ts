import fs from 'fs';
import path from 'path';
import { addLinkError } from '../state';
import { logError } from '../util/logger';

interface validateLinkParams {
  linkedFile: string;
  sourceFile: path.ParsedPath;
}

interface validateLinkReturn {
  exists: boolean;
  parsedPath: path.ParsedPath | null;
}

const validateLink = ({
  linkedFile,
  sourceFile,
}: validateLinkParams): validateLinkReturn => {
  let filePath = ' ';

  if (linkedFile.charAt(2) === '@') {
    addLinkError(
      `More than two @ in linked filename: ${sourceFile} ${linkedFile}`
    );
    return { exists: false, parsedPath: null };
  }
  if (linkedFile.charAt(1) === '@') {
    // @@
    filePath = path.join(sourceFile.dir, linkedFile.replace('@@', ''));
  } else if (linkedFile.charAt(0) === '@') {
    // @
    filePath = path.join(sourceFile.dir, linkedFile.replace('@', ''));
  } else {
    logError(`Unhandled case for file ${linkedFile}`);
  }

  const exists = fs.existsSync(filePath);
  if (!exists) {
    addLinkError(
      `Linked file "${linkedFile}" in "${path.format(
        sourceFile
      )}" does not exist. Location would be: "${filePath}"`
    );
  }

  return { exists, parsedPath: path.parse(filePath) };
};

export default validateLink;
