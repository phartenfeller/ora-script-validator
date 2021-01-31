import ErrorList from './types/ErrorList';
import { logDebug, logError } from './util/logger';

const tables: string[] = [];

const errors: ErrorList = {
  linkErrors: [],
  tableRefErrors: [],
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
};

const addTableRefError = (error: string): void => {
  errors.tableRefErrors.push(error);
};

const anyErrorOccurred = (): boolean => {
  return errors.linkErrors.length > 0 || errors.tableRefErrors.length > 0;
};

const getErrors = (): ErrorList => {
  return errors;
};

export {
  addLinkError,
  addTableRefError,
  anyErrorOccurred,
  getErrors,
  addTableDef,
  tableExists,
  getTables,
};
