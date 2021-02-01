import { addTableRefError, tableExists } from '../state';

const tableExistanceValidator = (table: string | undefined): void => {
  const exists = tableExists(table);

  if (!exists) {
    addTableRefError(`Referenced Table does not exist yet: ${table}`);
  }
};

export default tableExistanceValidator;
