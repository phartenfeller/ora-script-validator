import ErrorList from './types/ErrorList';
import { logDebug, logError } from './util/logger';

let tables: string[] = [];
const sequences: string[] = [];

const errors: ErrorList = {
  linkErrors: [],
  tableRefErrors: [],
  seqRefErrors: [],
  length: 0,
};

const initTables = (configTables: string[]) => {
  tables = configTables;
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

// Sequence functions
const addSeqDef = (seq: string | undefined): void => {
  if (seq) {
    logDebug(`Adding sequence ${seq}`);
    sequences.push(seq);
  } else {
    logError(`No sequence name provided to addSeqDef`);
  }
};

const seqExists = (seq: string | undefined): boolean => {
  if (seq) {
    logDebug(`Checking seq ${seq}`);
    return sequences.includes(seq);
  } else {
    logError(`No seq name provided to seqExists`);
    return true;
  }
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

const addSeqRefError = (error: string): void => {
  errors.seqRefErrors.push(error);
  errors.length++;
};

const getErrors = (): ErrorList => {
  return errors;
};

export {
  initTables,
  addLinkError,
  addTableRefError,
  getErrors,
  addTableDef,
  tableExists,
  getTables,
  addSeqDef,
  seqExists,
  addSeqRefError,
};
