import initTestConditions from '../_util/initTestConditions';

describe('Config tests', () => {
  let main;

  beforeEach(() => {
    return import('../../src/main').then((module) => {
      main = module;
      jest.resetModules();
      initTestConditions();
    });
  });

  describe('Expect no errors || rules', () => {
    test('Disable rule table/foreignKeys', () => {
      const errors = main.default({
        relPath: `./test/config/success/rules/disableForeignKeys/install.sql`,
        configPath: `./test/config/success/rules/disableForeignKeys/my.config.json`,
      }).tableRefErrors.length;
      expect(errors).toEqual(0);
    });

    test('Disable rule table/readGrants', () => {
      const errors = main.default({
        relPath: `./test/config/success/rules/disableReadGrants/install.sql`,
        configPath: `./test/config/success/rules/disableReadGrants/my.config.json`,
      }).tableRefErrors.length;
      expect(errors).toEqual(0);
    });

    test('Disable rule table/dmlStatements', () => {
      const errors = main.default({
        relPath: `./test/config/success/rules/disableDmlStatements/install.sql`,
        configPath: `./test/config/success/rules/disableDmlStatements/my.config.json`,
      }).tableRefErrors.length;
      expect(errors).toEqual(0);
    });

    test('Disable rule tableAlters', () => {
      const errors = main.default({
        relPath: `./test/config/success/rules/disableTableAlters/install.sql`,
        configPath: `./test/config/success/rules/disableTableAlters/my.config.json`,
      }).tableRefErrors.length;
      expect(errors).toEqual(0);
    });

    test('Disable rule sequence/nextvals', () => {
      const errors = main.default({
        relPath: `./test/config/success/rules/disableSeqNextval/install.sql`,
        configPath: `./test/config/success/rules/disableSeqNextval/my.config.json`,
      }).seqRefErrors.length;
      expect(errors).toEqual(0);
    });
  });

  // Errors when rule is not disabled
  describe('Expect errors || rules', () => {
    test('Keep rule enabled: table/foreignKeys', () => {
      const errors = main.default({
        relPath: `./test/config/success/rules/disableForeignKeys/install.sql`,
        configPath: `./test/config/error/orasv.config.json`,
      }).tableRefErrors.length;
      expect(errors).toEqual(1);
    });

    test('Keep rule enabled: table/readGrants', () => {
      const errors = main.default({
        relPath: `./test/config/success/rules/disableReadGrants/install.sql`,
        configPath: `./test/config/error/orasv.config.json`,
      }).tableRefErrors.length;
      expect(errors).toEqual(1);
    });

    test('Keep rule enabled: table/dmlStatements', () => {
      const errors = main.default({
        relPath: `./test/config/success/rules/disableDmlStatements/install.sql`,
        configPath: `./test/config/error/orasv.config.json`,
      }).tableRefErrors.length;
      expect(errors).toEqual(1);
    });

    test('Keep rule enabled: tableAlters', () => {
      const errors = main.default({
        relPath: `./test/config/success/rules/disableTableAlters/install.sql`,
        configPath: `./test/config/error/orasv.config.json`,
      }).tableRefErrors.length;
      expect(errors).toEqual(1);
    });

    test('Keep rule enabled: sequence/nextvals', () => {
      const errors = main.default({
        relPath: `./test/config/success/rules/disableSeqNextval/install.sql`,
        configPath: `./test/config/error/orasv.config.json`,
      }).seqRefErrors.length;
      expect(errors).toEqual(1);
    });
  });

  describe('Expect no errors || ignoreObjects', () => {
    test('Ignore Table with config', () => {
      const errors = main.default({
        relPath: `./test/config/success/ignoreObjects/tables/install.sql`,
        configPath: `./test/config/success/ignoreObjects/tables/my.config.json`,
      }).tableRefErrors.length;
      expect(errors).toEqual(0);
    });

    test('Ignore Sequences with config', () => {
      const errors = main.default({
        relPath: `./test/config/success/ignoreObjects/sequences/install.sql`,
        configPath: `./test/config/success/ignoreObjects/sequences/my.config.json`,
      }).seqRefErrors.length;
      expect(errors).toEqual(0);
    });
  });

  describe('Expect errors || ignoreObjects', () => {
    test(`Don't ignore Table with config`, () => {
      const errors = main.default({
        relPath: `./test/config/success/ignoreObjects/tables/install.sql`,
        configPath: `./test/config/error/orasv.config.json`,
      }).tableRefErrors.length;
      expect(errors).toEqual(1);
    });

    test(`Don't ignore Sequence with config`, () => {
      const errors = main.default({
        relPath: `./test/config/success/ignoreObjects/sequences/install.sql`,
        configPath: `./test/config/error/orasv.config.json`,
      }).seqRefErrors.length;
      expect(errors).toEqual(2);
    });
  });
});
