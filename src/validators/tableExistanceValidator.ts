import { addTableRefError, tableExists } from '../state';

interface tableExistanceValidatorParams {
  table: string | undefined;
  match: string;
  callingFile: string;
}

const tableExistanceValidator = ({
  table,
  match,
  callingFile,
}: tableExistanceValidatorParams): void => {
  const exists = tableExists(table);

  if (!exists) {
    addTableRefError(
      `Table referenced in "${callingFile}" does not exist yet: ${table}. Statement: "${match}"`
    );
  }
};

export default tableExistanceValidator;
