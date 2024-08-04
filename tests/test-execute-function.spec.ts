import { executeFunction } from '../src/index.js';

describe('test-execute-function.spec', () => {
  it('should execute the provided function with the given arguments', async () => {
    const fn = vi.fn((a: number, b: number) => a + b);

    const result = await executeFunction(fn, 2, 3);
    expect(fn.mock.lastCall).toHaveLength(2);
    expect(fn.mock.results[0].value).toBe(5);
    expect(result).toBe(5);
  });

  it('should execute the provided promise function with the given arguments', async () => {
    const fn = vi.fn(async (a: number, b: number) => Promise.resolve(a + b));

    const result = await executeFunction(fn, 2, 3);
    expect(fn.mock.lastCall).toHaveLength(2);
    expect(fn.mock.results[0].value).toEqual(Promise.resolve(5));
    expect(result).toBe(5);
  });

  it('should return undefined if no function is provided', async () => {
    const result = await executeFunction();
    expect(result).toBeUndefined();
  });
});
