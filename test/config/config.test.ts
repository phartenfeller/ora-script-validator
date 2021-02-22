import initTestConditions from '../_util/initTestConditions';

describe('File Links', () => {
  let main;

  beforeEach(() => {
    return import('../../src/main').then((module) => {
      main = module;
      jest.resetModules();
      initTestConditions();
    });
  });

  describe('Expect no errors', () => {
    test('Ignore Table with config', () => {
      const errors = main.default({
        relPath: `./test/config/success/ignoreTable/install.sql`,
        configPath: `./test/config/success/ignoreTable/my.config.json`,
      }).tableRefErrors.length;
      expect(errors).toEqual(0);
    });

    test('Disable rule table/foreignKeys', () => {
      const errors = main.default({
        relPath: `./test/config/success/disableForeignKeys/install.sql`,
        configPath: `./test/config/success/disableForeignKeys/my.config.json`,
      }).tableRefErrors.length;
      expect(errors).toEqual(0);
    });

    test('Disable rule table/readGrants', () => {
      const errors = main.default({
        relPath: `./test/config/success/disableReadGrants/install.sql`,
        configPath: `./test/config/success/disableReadGrants/my.config.json`,
      }).tableRefErrors.length;
      expect(errors).toEqual(0);
    });

    test('Disable rule table/dmlStatements', () => {
      const errors = main.default({
        relPath: `./test/config/success/disableDmlStatements/install.sql`,
        configPath: `./test/config/success/disableDmlStatements/my.config.json`,
      }).tableRefErrors.length;
      expect(errors).toEqual(0);
    });

    test('Disable rule tableAlters', () => {
      const errors = main.default({
        relPath: `./test/config/success/disableTableAlters/install.sql`,
        configPath: `./test/config/success/disableTableAlters/my.config.json`,
      }).tableRefErrors.length;
      expect(errors).toEqual(0);
    });

    test('Disable rule sequence/nextvals', () => {
      const errors = main.default({
        relPath: `./test/config/success/disableSeqNextval/install.sql`,
        configPath: `./test/config/success/disableSeqNextval/my.config.json`,
      }).seqRefErrors.length;
      expect(errors).toEqual(0);
    });
  });

  // test('Expect errors', () => {
  //   const errors = main.default(
  //     `./test/dmlStatements/error/install.sql`,
  //     Loglevel.error
  //   ).tableRefErrors.length;
  //   expect(errors).toEqual(3);
  // });
});
