/**
 * Checks if a value is a function.
 *
 * @param value - The value to check.
 * @returns Returns `true` if the value is a function, else `false`.
 */
export const isFunction = (value: unknown) => {
  return typeof value === 'function';
};
