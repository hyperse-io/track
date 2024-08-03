import { ensureArray } from '../src/index.js';

describe('test-ensure-array.spec', () => {
  it('should return the input array if it is already an array', () => {
    const input = [1, 2, 3];
    const result = ensureArray(input);
    expect(result).toBe(input);
  });

  it('should return an empty array if the input is null', () => {
    const input = null;
    const result = ensureArray(input);
    expect(result).toEqual([]);
  });

  it('should return an empty array if the input is undefined', () => {
    const input = undefined;
    const result = ensureArray(input);
    expect(result).toEqual([]);
  });

  it('should return an empty array if the input is an empty object', () => {
    const input = {};
    const result = ensureArray(input);
    expect(result).toEqual([]);
  });

  it('should wrap the input value in an array if it is not an array', () => {
    const input = 123;
    const result = ensureArray(input);
    expect(result).toEqual([input]);
  });
});
