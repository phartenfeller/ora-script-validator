import Loglevel from '../../src/types/Loglevel';

describe('File Links', () => {
  let main;

  beforeEach(() => {
    return import('../../src/main').then((module) => {
      main = module;
      jest.resetModules();
    });
  });

  test('Expected to succeed', () => {
    const errors = main.default(
      `./test/fileLinks/success/install.sql`,
      Loglevel.error
    ).linkErrors.length;
    expect(errors).toEqual(0);
  });

  test('Expected to succeed - Folders Up', () => {
    const errors = main.default(
      `./test/fileLinks/success_folders_up/deep/folder/nesting/install.sql`,
      Loglevel.error
    ).linkErrors.length;
    expect(errors).toEqual(0);
  });

  test('Expected to fail', () => {
    const errors = main.default(
      `./test/fileLinks/error/install.sql`,
      Loglevel.error
    ).linkErrors.length;
    expect(errors).toEqual(2);
  });
});
