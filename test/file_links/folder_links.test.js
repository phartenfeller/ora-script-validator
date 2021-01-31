const main = require('../../index');

describe('File Links', () => {
  test('Expected to succeed', () => {
    expect(() => {
      main(`./success/install.sql`).linkErrors.length.toBe(0);
    });
  });

  test('Expected to fail', () => {
    expect(() => {
      main(`./error/install.sql`).linkErrors.length.toBe(2);
    });
  });
});
