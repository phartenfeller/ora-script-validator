import main from '../../index';
import Loglevel from '../../src/types/Loglevel';

describe('File Links', () => {
  test('Expected to succeed', () => {
    const errors = main(`./test/fileLinks/success/install.sql`, Loglevel.error)
      .linkErrors.length;
    expect(errors).toEqual(0);
  });

  test('Expected to fail', () => {
    const errors = main(`./test/fileLinks/error/install.sql`, Loglevel.error)
      .linkErrors.length;
    expect(errors).toEqual(2);
  });
});
