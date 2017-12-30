/* global describe, it */

const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'Jon';
    const text = 'This is Jon';
    const res = generateMessage(from, text);
    expect(res).toMatchObject({ from, text });
    expect(typeof res.createdAt).toBe('number');
  });
});

// a synchronous test, no need to add 'done' argument
describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'User';
    const lat = 10;
    const lng = 42;
    const url = 'https://www.google.com/maps?q=10,42';
    const res = generateLocationMessage(from, lat, lng);
    expect(res).toMatchObject({ from, url });
    expect(typeof res.createdAt).toBe('number');
    expect(res.from).toBe('User');
    expect(res.url).toBe(url);
  });
});
