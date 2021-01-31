import fs from 'fs';
import path from 'path';
import readAndPrepareFile from './src/util/readAndPrepareFile';

let baseDir = ' ';

interface errorList {
  linkErrors: string[];
}

const errors: errorList = {
  linkErrors: [],
};

interface validateLinkParams {
  linkedFile: string;
  sourceFile: path.ParsedPath;
}

/**
 * Validates a link in an script
 */
const validateLink = ({ linkedFile, sourceFile }: validateLinkParams) => {
  let filePath = ' ';

  if (linkedFile.charAt(2) === '@') {
    errors.linkErrors.push(
      `More than two @ in linked filename: ${sourceFile} ${linkedFile}`
    );
    return { exists: false, filePath: null };
  }
  if (linkedFile.charAt(1) === '@') {
    // @@
    filePath = path.join(sourceFile.dir, linkedFile.replace('@@', ''));
  } else if (linkedFile.charAt(0) === '@') {
    // @
    filePath = path.join(sourceFile.dir, linkedFile.replace('@', ''));
  } else {
    console.log(`Unhandled case for file ${linkedFile}`);
  }

  const exists = fs.existsSync(filePath);
  if (!exists) {
    errors.linkErrors.push(
      `Linked file "${linkedFile}" in "${path.format(
        sourceFile
      )}" does not exist. Location would be: "${filePath}"`
    );
  }

  return { exists, parsedPath: path.parse(filePath) };
};

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
    fileContents = readAndPrepareFile(path.format(currentFile));
    const links = fileContents.match(/^@.*$/gm);
    if (!links || links.length === 0) return;
    links.forEach((linkedFile: string) => {
      const { exists, parsedPath } = validateLink({
        linkedFile,
        sourceFile: currentFile,
      });

      if (exists && parsedPath) {
        validateFile({
          currentFile: parsedPath,
          dir,
        });
      }
    });
  } catch (err) {
    console.log(
      `${err} Filecontents: ${fileContents || 'could not open file'}`
    );
  }
};

/**
 * Main function that starts the validation
 */
const main = (relPath: string): errorList => {
  const parsedPath = path.parse(relPath);
  baseDir = path.resolve(parsedPath.dir);

  validateFile({
    currentFile: parsedPath,
    dir: baseDir,
  });
  if (errors.linkErrors.length > 0) {
    console.log(`Errors: ${JSON.stringify(errors)}`);
  } else {
    console.log(`✅ No errors found`);
  }

  return errors;
};

main('./db_objects/install_lct.sql');

export default main;
