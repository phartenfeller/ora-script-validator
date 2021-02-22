import IndexType from '../types/IndexType';

interface RuleList {
  [key: string]: IndexType;
}

const ruleList: RuleList = {
  'table/foreignKeys': IndexType.ForeignKey,
  'table/readGrants': IndexType.ReadGrant,
  'table/tableAlters': IndexType.AlterTable,
  'table/dmlStatements': IndexType.DMLStatement,
  'sequence/nextvals': IndexType.SeqNextval,
};

export default ruleList;
