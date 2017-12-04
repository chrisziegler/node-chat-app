/* global describe, it */

const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'Jon';
    const text = 'This is Jon';
    const res = generateMessage(from, text);
    expect(res).toMatchObject({ from, text });
    expect(typeof res.createdAt).toBe('number');
  });
});

