import Loglevel from '../../src/types/Loglevel';

describe('File Links', () => {
  let main;

  beforeEach(() => {
    return import('../../src/main').then((module) => {
      main = module;
      jest.resetModules();
    });
  });

  test('Expect no errors', () => {
    const errors = main.default(
      `./test/tableRefs/success/install.sql`,
      Loglevel.error
    ).tableRefErrors.length;
    expect(errors).toEqual(0);
  });

  test('Expect errors', () => {
    const errors = main.default(
      `./test/tableRefs/error/install.sql`,
      Loglevel.error
    ).tableRefErrors.length;
    expect(errors).toEqual(1);
  });
});
