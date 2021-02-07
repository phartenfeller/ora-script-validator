import IndexType from './types/IndexType';
import readAndPrepareFile from './util/readAndPrepareFile';

interface IndexMatch {
  type: IndexType;
  line: string;
  num: number;
  identifier: string | undefined;
  match: string;
  callingFile: string;
}

interface Matcher {
  type: IndexType;
  regex: RegExp;
  identifierIndex: number | null;
}

const matchers: Matcher[] = [
  // links to other scripts
  {
    type: IndexType.Link,
    regex: /\s*^@.*$/i,
    identifierIndex: null,
  },
  // table creatons
  {
    type: IndexType.Table,
    regex: /\s*create\s*table\s*(\S+)/i,
    identifierIndex: 1,
  },
  // foreign keys
  {
    type: IndexType.ForeignKey,
    regex: /\s*foreign\s*key.*references\s*(\S+)/i,
    identifierIndex: 1,
  },
  // read / select grants
  {
    type: IndexType.ReadGrant,
    regex: /\s*grant\s*(read|select)\s*on\s*(\S+)/i,
    identifierIndex: 2,
  },
  // alter table
  {
    type: IndexType.AlterTable,
    regex: /\s*alter\s*table\s*(\S+)/i,
    identifierIndex: 1,
  },
  // insert statement
  {
    type: IndexType.DMLStatement,
    regex: /\s*insert\s*into\s*(\S+)/i,
    identifierIndex: 1,
  },
  // update statements
  {
    type: IndexType.DMLStatement,
    regex: /\s*update\s*(\S+)\sset/i,
    identifierIndex: 1,
  },
  // delete statement
  {
    type: IndexType.DMLStatement,
    regex: /\s*delete\s*from\s*(\S+)/i,
    identifierIndex: 1,
  },
  // create sequence
  {
    type: IndexType.CreateSequence,
    regex: /\s*create\s*sequence\s*(\S+[^;])/i,
    identifierIndex: 1,
  },
  // sequence nextval
  {
    type: IndexType.SeqNextval,
    regex: /\s*(\S+).nextval/i,
    identifierIndex: 1,
  },
];

const indexFile = (path: string): IndexMatch[] => {
  const matches: IndexMatch[] = [];

  const fileContents = readAndPrepareFile(path);

  const lines = fileContents.split('\n');

  lines.forEach((line: string, num: number) => {
    if (line) {
      matchers.forEach((matcher) => {
        const match = line.match(matcher.regex);

        if (match && match[0]) {
          matches.push({
            type: matcher.type,
            line,
            num,
            match: match[0],
            callingFile: path,
            identifier:
              matcher.identifierIndex !== null
                ? match[matcher.identifierIndex].trim().toLowerCase()
                : undefined,
          });
        }
      });
    }
  });

  return matches;
};

export default indexFile;
