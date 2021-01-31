const main = require('../../index');

describe('File Links', () => {
  test('Expected to succeed', () => {
    expect(() => {
      main(`./success/install.sql`, 1).tableRefErrors.length.toBe(0);
    });
  });

  test('Expected to fail', () => {
    expect(() => {
      main(`./error/install.sql`, 1).linkErrors.length.toBe(1);
    });
  });
});
