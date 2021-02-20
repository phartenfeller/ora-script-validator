import IndexType from '../types/IndexType';

const rulesMap: Map<IndexType, boolean> = new Map();

interface RulesIndexMatch {
  [key: string]: IndexType;
}

const rulesIndexMatch: RulesIndexMatch = {
  foreignKeys: IndexType.ForeignKey,
  readGrants: IndexType.ReadGrant,
  tableAlters: IndexType.AlterTable,
  dmlStatements: IndexType.DMLStatement,
};

const initRulesMap = (): void => {
  const indexTypeArray = Object.values(rulesIndexMatch);
  indexTypeArray.forEach((indexer) => rulesMap.set(indexer, true));
};

const deactivateRule = (rule: string): void => {
  const indexer = rulesIndexMatch[rule];
  if (indexer) {
    rulesMap.set(indexer, false);
  }
};

const isActive = (indexer: IndexType): boolean => {
  return rulesMap.get(indexer) ?? false;
};

export { initRulesMap, deactivateRule, isActive };
