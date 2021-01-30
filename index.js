const path = require('path');
const fs = require('fs');

let baseDir;
let fileName;

const errors = {
  linkErrors: [],
};

const validateLink = ({ link, dir, sourceFile }) => {
  let filePath;

  if (link.charAt(2) === '@') {
    errors.linkErrors.push(
      `More than two @ in linked filename: ${sourceFile} ${link}`
    );
    return;
  }
  if (link.charAt(1) === '@') {
    // @@
    filePath = path.join(baseDir, dir, link.replace('@@', ''));
  } else if (link.charAt(0) === '@') {
    // @
    filePath = path.join(baseDir, link.replace('@', ''));
  } else {
    console.log(`Unhandled case for file ${link}`);
  }

  const exists = fs.existsSync(filePath);
  if (!exists)
    errors.linkErrors.push(
      `Linked file ${link} in ${sourceFile} does not exist`
    );
};

const main = () => {
  const filePath = path.parse('./db_objects/install_lct.sql');
  baseDir = path.resolve(filePath.dir);
  console.log({ baseDir });
  fileName = `${filePath.dir}/${filePath.base}`;

  fs.readFile(fileName, 'utf-8', (err, data) => {
    const links = data.match(/^@.*$/gm);
    links.forEach((link) => {
      validateLink({ link, dir: baseDir, sourceFile: filePath.base });
    });
    console.log(errors);
  });
};

main();
