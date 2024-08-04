import { deepClone } from '../src/helpers/helper-deep-clone.js';

describe('test-deep-clone.spec', () => {
  it('clones a simple flat object', () => {
    const target = { a: 1, b: 2 };
    const result = deepClone(target);

    expect(result).toEqual(target);
    expect(result).not.toBe(target);
  });

  it('clones a simple deep object', () => {
    const target = { a: 1, b: { c: 3, d: [1, 2, 3] } };
    const result = deepClone(target);

    expect(result).toEqual(target);
    expect(result).not.toBe(target);
  });

  it('clones a simple flat array', () => {
    const target = [1, 2, 3];
    const result = deepClone(target);

    expect(result).toEqual(target);
    expect(result).not.toBe(target);
  });

  it('clones a simple deep array', () => {
    const target = [1, [2, 3], [4, [5, [6]]]];
    const result = deepClone(target);

    expect(result).toEqual(target);
    expect(result).not.toBe(target);
  });

  it('passes through primitive types', () => {
    expect(deepClone(1)).toBe(1);
    expect(deepClone('a')).toBe('a');
    expect(deepClone(true as any)).toBe(true);
    expect(deepClone(null as any)).toBe(null);
    expect(deepClone(undefined as any)).toBe(undefined);
  });

  it('does not clone class instance', () => {
    const target = new Foo();
    const result = deepClone(target);

    expect(result).toBe(target);
  });

  it('does not clone class instance in array', () => {
    const foo = new Foo();
    const target = [foo];
    const result = deepClone(target);

    expect(result).toEqual(target);
    expect(result).not.toBe(target);
    expect(result[0]).toBe(target[0]);
  });

  it('does not clone class instance in object', () => {
    const foo = new Foo();
    const target = { a: foo };
    const result = deepClone(target);

    expect(result).toEqual(target);
    expect(result).not.toBe(target);
    expect(result.a).toBe(target.a);
  });

  it('clone does not share references with original', () => {
    const original = { user: { name: 'mike' } };
    const clone = deepClone(original);

    original.user.name = 'pete';

    expect(clone.user.name).toEqual('mike');
  });
});

class Foo {}
