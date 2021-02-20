import fs from 'fs';
import { initTables } from '../state';
import { ConfigFile, IgnoreObjects, Rules } from '../types/configTypes';
import { logError, logInfo } from '../util/logger';
import { deactivateRule, initRulesMap } from './activeRules';

const processIgnoreObjects = (ignoreObjects: IgnoreObjects | undefined) => {
  if (!ignoreObjects) return;

  if (ignoreObjects.tables && Array.isArray(ignoreObjects.tables)) {
    const tables = ignoreObjects.tables;

    const filteredTables = tables.filter((table) => {
      if (typeof table !== 'string') {
        logError(
          `Config includes value that is not a string at ignoreObjects.tables : ${JSON.stringify(
            table
          )}\nThe value will be ignored.`
        );
        return false;
      }
      return true;
    });

    initTables(filteredTables);
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

const checkConfig = (path: string): void => {
  initRulesMap();
  const exists = fs.existsSync(path);

  if (exists) {
    try {
      const contents = fs.readFileSync(path, 'utf-8');
      const config: ConfigFile = JSON.parse(contents);
      processConfig(config);
      logInfo('Processed config file.\n');
    } catch (err) {
      logError(
        `Cannot process config file at ${path}. Process whill be terminated.\n${err}`
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
