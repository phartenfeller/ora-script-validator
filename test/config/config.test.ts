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

    test('Disable rule table alters', () => {
      const errors = main.default({
        relPath: `./test/config/success/disableTableAlters/install.sql`,
        configPath: `./test/config/success/disableTableAlters/my.config.json`,
      }).tableRefErrors.length;
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
