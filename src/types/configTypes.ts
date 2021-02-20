// All properties are optional

export interface IgnoreObjects {
  tables?: string[];
}

export interface Rules {
  [key: string]: boolean;
}

export interface ConfigFile {
  ignoreObjects?: IgnoreObjects;
  rules?: Rules;
}
