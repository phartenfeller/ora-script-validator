import fs from 'fs';
import { logError } from './logger';
import replaceAll from './replaceAll';

const LB = '\n';

const readAndPrepareFile = (path: string): string => {
  try {
    let data = fs.readFileSync(path, 'utf-8');

    // remove comments
    data = data.replace(/\/\*([\s\S]*?)\*\//g, ' '); // multiline
    data = data.replace(/--.*/g, ' '); // single line

    // add newlines to make the processing with line nubmers easier (limit amount of statements in single line)
    data = replaceAll(data, ',', `,${LB}`);
    data = replaceAll(data, ';', `;${LB}`);

    return data;
  } catch (err) {
    logError(`Cannot read file: ${path}. \n ${err}`);
    throw err;
  }
};

export default readAndPrepareFile;
