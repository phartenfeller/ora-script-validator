import IndexType from '../types/IndexType';
import ruleList from './ruleList';

const rulesMap: Map<IndexType, boolean> = new Map();

const initRulesMap = (): void => {
  const indexTypeArray = Object.values(ruleList);
  indexTypeArray.forEach((indexer) => rulesMap.set(indexer, true));
};

const deactivateRule = (rule: string): void => {
  const indexer = ruleList[rule];
  if (indexer) {
    rulesMap.set(indexer, false);
  }
};

const isActive = (indexer: IndexType): boolean => {
  return rulesMap.get(indexer) ?? false;
};

export { initRulesMap, deactivateRule, isActive };
