import ErrorList from './types/ErrorList';
import { logDebug, logError } from './util/logger';

const tables: string[] = [];

const errors: ErrorList = {
  linkErrors: [],
  tableRefErrors: [],
  length: 0,
};

// Table functions
const addTableDef = (table: string | undefined): void => {
  if (table) {
    logDebug(`Adding table ${table}`);
    tables.push(table);
  } else {
    logError(`No table name provided to addTableDef`);
  }
};

const tableExists = (table: string | undefined): boolean => {
  if (table) {
    logDebug(`Checking table ${table}`);
    return tables.includes(table);
  } else {
    logError(`No table name provided to tableExists`);
    return true;
  }
};

const getTables = (): string[] => {
  return tables;
};

// Error function
const addLinkError = (error: string): void => {
  errors.linkErrors.push(error);
  errors.length++;
};

const addTableRefError = (error: string): void => {
  errors.tableRefErrors.push(error);
  errors.length++;
};

const getErrors = (): ErrorList => {
  return errors;
};

export {
  addLinkError,
  addTableRefError,
  getErrors,
  addTableDef,
  tableExists,
  getTables,
};
