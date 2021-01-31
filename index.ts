import fs from 'fs';
import path from 'path';

let baseDir = ' ';
let fileName = ' ';

interface errorList {
  linkErrors: string[];
}

const errors: errorList = {
  linkErrors: [],
};

interface validateLinkParams {
  linkedFile: string;
  dir: string;
  sourceFile: string;
}

/**
 * Validates a link in an script
 */
const validateLink = ({ linkedFile, dir, sourceFile }: validateLinkParams) => {
  let filePath = ' ';

  if (linkedFile.charAt(2) === '@') {
    errors.linkErrors.push(
      `More than two @ in linked filename: ${sourceFile} ${linkedFile}`
    );
    return { exists: false, filePath: null };
  }
  if (linkedFile.charAt(1) === '@') {
    // @@
    filePath = path.join(baseDir, dir, linkedFile.replace('@@', ''));
  } else if (linkedFile.charAt(0) === '@') {
    // @
    filePath = path.join(baseDir, linkedFile.replace('@', ''));
  } else {
    console.log(`Unhandled case for file ${linkedFile}`);
  }

  const exists = fs.existsSync(filePath);
  if (!exists) {
    errors.linkErrors.push(
      `Linked file ${linkedFile} in ${sourceFile} does not exist`
    );
  }

  return { exists, filePath };
};

interface validateFileParams {
  currentFile: string;
  sourceFile: string;
}

/**
 * Validates a file for any errors
 */
const validateFile = ({ currentFile, sourceFile }: validateFileParams) => {
  console.log({ currentFile });
  let data: string | undefined;
  try {
    data = fs.readFileSync(currentFile, 'utf-8');
    const links = data.match(/^@.*$/gm);
    if (!links || links.length === 0) return;
    links.forEach((linkedFile: string) => {
      const { exists, filePath } = validateLink({
        linkedFile,
        dir: baseDir,
        sourceFile,
      });

      if (exists && filePath) {
        validateFile({ currentFile: filePath, sourceFile: currentFile });
      }
    });
  } catch (err) {
    console.log(`${err} Filecontents: ${data || 'could not open file'}`);
  }
};

/**
 * Main function that starts the validation
 */
const main = (relPath: string) => {
  const filePath = path.parse(relPath);
  baseDir = path.resolve(filePath.dir);
  console.log({ baseDir });
  fileName = `${filePath.dir}/${filePath.base}`;

  validateFile({ currentFile: fileName, sourceFile: filePath.base });
  console.log(errors);
};

main('./db_objects/install_lct.sql');

module.exports = { main };
