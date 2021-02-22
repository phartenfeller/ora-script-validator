import { isActive } from '../config/activeRules';
import { addTableRefError, tableExists } from '../state';
import IndexType from '../types/IndexType';

interface tableExistanceValidatorParams {
  table: string | undefined;
  match: string;
  callingFile: string;
  indexer: IndexType;
}

const tableExistanceValidator = ({
  table,
  match,
  callingFile,
  indexer,
}: tableExistanceValidatorParams): void => {
  if (!isActive(indexer)) return;
  const exists = tableExists(table);

  if (!exists) {
    addTableRefError(
      `Table referenced in "${callingFile}" does not exist yet: ${table}. Statement: "${match}"`
    );
  }
};

export default tableExistanceValidator;
