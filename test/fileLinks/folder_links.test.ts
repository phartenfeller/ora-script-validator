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

  test('Expected to succeed', () => {
    const errors = main.default({
      relPath: `./test/fileLinks/success/install.sql`,
    }).linkErrors.length;
    expect(errors).toEqual(0);
  });

  test('Expected to succeed - Folders Up', () => {
    const errors = main.default({
      relPath: `./test/fileLinks/success_folders_up/deep/folder/nesting/install.sql`,
    }).linkErrors.length;
    expect(errors).toEqual(0);
  });

  test('Expected to fail', () => {
    const errors = main.default({
      relPath: `./test/fileLinks/error/install.sql`,
    }).linkErrors.length;
    expect(errors).toEqual(2);
  });
});
