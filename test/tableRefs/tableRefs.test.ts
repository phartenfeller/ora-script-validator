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

  test('Expect no errors', () => {
    const errors = main.default({
      relPath: `./test/tableRefs/success/install.sql`,
    }).tableRefErrors.length;
    expect(errors).toEqual(0);
  });

  test('Expect errors', () => {
    const errors = main.default({
      relPath: `./test/tableRefs/error/install.sql`,
    }).tableRefErrors.length;
    expect(errors).toEqual(2);
  });
});
