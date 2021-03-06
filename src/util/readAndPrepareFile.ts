import fs from 'fs';
import { logDebug, logError } from './logger';
import replaceAll from './replaceAll';

const LB = '\n';

const readAndPrepareFile = (path: string): string => {
  try {
    logDebug(`processing file: ${path}`);
    let data = fs.readFileSync(path, 'utf-8');

    // remove comments
    data = data.replace(/\/\*([\s\S]*?)\*\//g, ' '); // multiline
    data = data.replace(/--.*/g, ' '); // single line

    // remove sql script commands
    data = data.replace(/prompt.*/gi, ' '); // single line
    data = data.replace(/spool.*/gi, ' '); // single line

    // remove all linebraks at various statements to squeeze statements into a single line
    data = data.replace(/create[^"]*;/, (match) => match.replace(/\n/g, ' '));
    data = data.replace(/alter[^"]*;/, (match) => match.replace(/\n/g, ' '));
    data = data.replace(/grant[^"]*;/, (match) => match.replace(/\n/g, ' '));
    data = data.replace(/insert[^"]*;/, (match) => match.replace(/\n/g, ' '));
    data = data.replace(/update[^"]*;/, (match) => match.replace(/\n/g, ' '));
    data = data.replace(/delete[^"]*;/, (match) => match.replace(/\n/g, ' '));
    // linebreaks in foreign keys
    data = data.replace(/foreign key[^"]*;/gi, (match) =>
      match.replace(/\n/g, ' ')
    );

    // add linebraks to make different statements be in different lines
    data = replaceAll(data, ',', `,${LB}`);
    data = replaceAll(data, ';', `;${LB}`);
    // add linebreak after file links
    data = data.replace(/@[^\s]+/gm, (match) =>
      match.replace(match, match + LB)
    );
    // add linebreak after create table
    data = data.replace(/\s*create\s*table\s*(\S+)\s\(/gm, (match) =>
      match.replace(match, match + LB)
    );

    // remove empty lines
    data = data.replace(/^\s*[\r\n]/gm, '');
    // left trim whitespace
    data = data.replace(/^ +/gm, '');

    return data;
  } catch (err) {
    logError(`Cannot read file: ${path}. \n ${err}`);
    throw err;
  }
};

export default readAndPrepareFile;
