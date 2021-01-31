import IndexType from './types/IndexType';
import readAndPrepareFile from './util/readAndPrepareFile';

interface IndexMatch {
  type: IndexType;
  line: string;
  num: number;
  identifier?: string;
}

const indexFile = (path: string): IndexMatch[] => {
  const matches: IndexMatch[] = [];

  const fileContents = readAndPrepareFile(path);

  const lines = fileContents.split('\n');

  lines.forEach((line: string, num: number) => {
    // links to other scripts
    let match = line.match(/\s*^@.*$/i);

    if (match && match[0]) {
      matches.push({ type: IndexType.Link, line, num });
    }

    // table creatons
    match = line.match(/\s*create\s*table\s*(\S+)/i);

    if (match && match[0]) {
      matches.push({
        type: IndexType.Table,
        line,
        num,
        identifier: match[1].toLowerCase(),
      });
    }

    // foreign keys
    match = line.match(/\s*foreign\s*key\s*\(\S+\s*references\s*(\S+)/i);

    if (match && match[0]) {
      matches.push({
        type: IndexType.ForeignKey,
        line,
        num,
        identifier: match[1].toLowerCase(),
      });
    }
  });

  return matches;
};

export default indexFile;
