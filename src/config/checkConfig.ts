import fs from 'fs';
import path from 'path';
import { initSequences, initTables } from '../state';
import { ConfigFile, IgnoreObjects, Rules } from '../types/configTypes';
import { logError, logInfo } from '../util/logger';
import { deactivateRule, initRulesMap } from './activeRules';

const filterIgnoredObjects = (objects: string[], type: string): string[] => {
  const filteredObjects = objects.filter((object) => {
    if (typeof object !== 'string') {
      logError(
        `Config includes value that is not a string at ignoreObjects.${type} : ${JSON.stringify(
          object
        )}\nThe value will be ignored.`
      );
      return false;
    }
    return true;
  });

  return filteredObjects;
};

const processIgnoreObjects = (ignoreObjects: IgnoreObjects | undefined) => {
  if (!ignoreObjects) return;

  if (ignoreObjects.tables && Array.isArray(ignoreObjects.tables)) {
    const tables = ignoreObjects.tables;
    const filteredTables = filterIgnoredObjects(tables, 'tables');
    initTables(filteredTables);
  }

  if (ignoreObjects.sequences && Array.isArray(ignoreObjects.sequences)) {
    const sequences = ignoreObjects.sequences;
    const filteredTables = filterIgnoredObjects(sequences, 'sequences');
    initSequences(filteredTables);
  }
};

const processRules = (rules: Rules | undefined): void => {
  if (!rules) return;

  for (const [rule, active] of Object.entries(rules)) {
    if (active === false) {
      deactivateRule(rule);
    }
  }
};

const processConfig = (config: ConfigFile): void => {
  processIgnoreObjects(config.ignoreObjects);
  processRules(config.rules);
};

const checkConfig = (configPath: string): void => {
  initRulesMap();

  const parsedPath = path.parse(configPath);
  const fullPath = path.format(parsedPath);

  const exists = fs.existsSync(fullPath);

  if (exists) {
    try {
      const contents = fs.readFileSync(fullPath, 'utf-8');
      const config: ConfigFile = JSON.parse(contents);
      processConfig(config);
      logInfo('Processed config file.\n');
    } catch (err) {
      logError(
        `Cannot process config file at ${fullPath}. Process whill be terminated.\n${err}`
      );
      process.exit(1);
    }
  } else {
    logInfo(
      'No config file found, using default options. You can generate a config file with "orasv --genConfig" \n'
    );
  }
};

export default checkConfig;
