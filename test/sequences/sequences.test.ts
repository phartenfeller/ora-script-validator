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
      `./test/sequences/success/install.sql`,
      Loglevel.error
    ).seqRefErrors.length;
    expect(errors).toEqual(0);
  });

  test('Expect errors', () => {
    const errors = main.default(
      `./test/sequences/error/install.sql`,
      Loglevel.error
    ).seqRefErrors.length;
    expect(errors).toEqual(2);
  });
});
