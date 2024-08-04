export const isObject = (item: any): item is object => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

export const isClassInstance = (item: any): boolean => {
  return (
    isObject(item) && item.constructor && item.constructor.name !== 'Object'
  );
};

/**
 * Deep clones an object or array.
 *
 * @template T - The type of the input value.
 * @param {T} input - The input value to be deep cloned.
 * @returns {T} - The deep cloned value.
 */
export const deepClone = <T extends string | number | any[] | object>(
  input: T
): T => {
  // if not array or object or is null return self
  if (typeof input !== 'object' || input === null) {
    return input;
  }
  let output: any;
  let i: number | string;
  // handle case: array
  if (input instanceof Array) {
    let l;
    output = [] as any[];
    for (i = 0, l = input.length; i < l; i++) {
      output[i] = deepClone(input[i]);
    }
    return output;
  }
  if (isClassInstance(input)) {
    return input;
  }
  // handle case: object
  output = {};
  for (i in input) {
    // eslint-disable-next-line no-prototype-builtins
    if (input.hasOwnProperty(i)) {
      output[i] = deepClone((input as any)[i]);
    }
  }
  return output;
};
