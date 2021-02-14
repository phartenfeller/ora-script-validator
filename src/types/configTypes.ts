export interface IgnoreObjects {
  tables: string[];
}

export interface Rules {
  foreignKeys: boolean;
  readGrants: boolean;
  tableAlters: boolean;
  dmlStatements: boolean;
}

export interface ConfigFiles {
  ignoreObjects: IgnoreObjects;
  rules: Rules;
}
