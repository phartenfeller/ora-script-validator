import fs from 'fs';
import replaceAll from './replaceAll';

const NEWLINE = '\n';

const readAndPrepareFile = (path: string): string => {
  try {
    let data = fs.readFileSync(path, 'utf-8');

    // add newlines to make the processing with line nubmers easier
    data = replaceAll(data, ',', NEWLINE);
    data = replaceAll(data, ';', NEWLINE);

    return data;
  } catch (err) {
    console.error(`Cannot read file: ${path}. \n ${err}`);
    throw err;
  }
};

export default readAndPrepareFile;
