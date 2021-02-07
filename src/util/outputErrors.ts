import ErrorList from '../types/ErrorList';
import { logInfo, redText } from './logger';

const logCategory = (errors: string[], category: string): void => {
  if (errors.length > 0) {
    logInfo(`\n=== ${category} ===`);
    errors.forEach((errMsg: string) => {
      logInfo('❌  ' + errMsg);
    });
  }
};

const outputErrors = (errors: ErrorList): void => {
  logInfo(redText(`${errors.length} errors occurred !!!`));

  logCategory(errors.linkErrors, 'Link Errors');
  logCategory(errors.tableRefErrors, 'Table Ref Errors');
  logCategory(errors.seqRefErrors, 'Sequence Ref Errors');
};

export default outputErrors;
