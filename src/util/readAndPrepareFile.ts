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

    // remove all linebraks at create and alter statements to allow line by line analysis of statements
    data = data.replace(/create[^"]*;/, (match) => match.replace(/\n/g, ' '));
    data = data.replace(/alter[^"]*;/, (match) => match.replace(/\n/g, ' '));

    // remove all linebraks at constraints
    data = data.replace(/foreign key[^"]*;/gi, (match) =>
      match.replace(/\n/g, ' ')
    );

    // add linebraks to make the processing with line nubmers easier (limit amount of statements in single line)
    data = replaceAll(data, ',', `,${LB}`);
    data = replaceAll(data, ';', `;${LB}`);

    // remove empty lines
    data = data.replace(/^\s*[\r\n]/gm, '');

    return data;
  } catch (err) {
    logError(`Cannot read file: ${path}. \n ${err}`);
    throw err;
  }
};

export default readAndPrepareFile;
