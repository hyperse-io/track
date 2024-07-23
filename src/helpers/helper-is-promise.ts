export const isPromise = <T>(value: any): value is Promise<T> => {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }
  return false;
};
