import { ConfigFile, Rules } from '../types/configTypes';
import ruleList from './ruleList';

const rulesObj: Rules = {};
const rules = Object.keys(ruleList);
rules.forEach((rule) => (rulesObj[rule] = true));

const configFile: ConfigFile = {
  // add e. g. tables that that won't result in errors
  // because they were added before
  ignoreObjects: {
    tables: [],
    sequences: [],
  },
  // enable or disable rules
  rules: rulesObj,
};

export default configFile;
