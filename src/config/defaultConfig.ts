import { ConfigFiles } from '../types/configTypes';

const configFile: ConfigFiles = {
  // add e. g. tables that that won't result in errors
  // because they were added before
  ignoreObjects: {
    tables: [],
  },
  // enable or disable rules
  rules: {
    foreignKeys: true,
    readGrants: true,
    tableAlters: true,
    dmlStatements: true,
  },
};

export default configFile;
