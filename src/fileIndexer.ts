import IndexType from './types/IndexType';
import readAndPrepareFile from './util/readAndPrepareFile';

interface IndexMatch {
  type: IndexType;
  line: string;
  num: number;
  identifier?: string;
  match: string;
  callingFile: string;
}

const indexFile = (path: string): IndexMatch[] => {
  const matches: IndexMatch[] = [];

  const fileContents = readAndPrepareFile(path);

  const lines = fileContents.split('\n');

  lines.forEach((line: string, num: number) => {
    if (line) {
      // links to other scripts
      let match = line.match(/\s*^@.*$/i);

      if (match && match[0]) {
        matches.push({
          type: IndexType.Link,
          line,
          num,
          match: match[0],
          callingFile: path,
        });
      }

      // table creatons
      match = line.match(/\s*create\s*table\s*(\S+)/i);

      if (match && match[0]) {
        matches.push({
          type: IndexType.Table,
          line,
          num,
          identifier: match[1].toLowerCase(),
          match: match[0],
          callingFile: path,
        });
      }

      // foreign keys
      match = line.match(/\s*foreign\s*key.*references\s*(\S+)/i);

      if (match && match[0]) {
        matches.push({
          type: IndexType.ForeignKey,
          line,
          num,
          identifier: match[1].toLowerCase(),
          match: match[0],
          callingFile: path,
        });
      }

      // read / select grants
      match = line.match(/\s*grant\s*(read|select)\s*on\s*(\S+)/i);

      if (match && match[0]) {
        matches.push({
          type: IndexType.ReadGrant,
          line,
          num,
          identifier: match[2].toLowerCase(),
          match: match[0],
          callingFile: path,
        });
      }

      // alter table
      match = line.match(/\s*alter\s*table\s*(\S+)/i);

      if (match && match[0]) {
        matches.push({
          type: IndexType.AlterTable,
          line,
          num,
          identifier: match[1].toLowerCase(),
          match: match[0],
          callingFile: path,
        });
      }

      // insert statement
      match = line.match(/\s*insert\s*into\s*(\S+)/i);

      if (match && match[0]) {
        matches.push({
          type: IndexType.DMLStatement,
          line,
          num,
          identifier: match[1].toLowerCase(),
          match: match[0],
          callingFile: path,
        });
      }

      // update statements
      match = line.match(/\s*update\s*(\S+)\sset/i);

      if (match && match[0]) {
        matches.push({
          type: IndexType.DMLStatement,
          line,
          num,
          identifier: match[1].toLowerCase(),
          match: match[0],
          callingFile: path,
        });
      }

      // delete statement
      match = line.match(/\s*delete\s*from\s*(\S+)/i);

      if (match && match[0]) {
        matches.push({
          type: IndexType.DMLStatement,
          line,
          num,
          identifier: match[1].toLowerCase(),
          match: match[0],
          callingFile: path,
        });
      }
    }
  });

  return matches;
};

export default indexFile;
