/**
 * Ensures that a value is converted to an array.
 * If the value is already an array, it is returned as is.
 * If the value is null, undefined, or an empty object, an empty array is returned.
 * Otherwise, the value is wrapped in an array and returned.
 *
 * @param value - The value to ensure as an array.
 * @returns The value as an array.
 */
export const ensureArray = <T>(value: T | T[]) => {
  if (Array.isArray(value)) {
    return value;
  } else if (
    value === null ||
    value === undefined ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  ) {
    return [];
  } else {
    return [value];
  }
};
