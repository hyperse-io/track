import { isArray } from 'lodash';

export const ensureArray = <T>(value: T | T[]) => {
  if (isArray(value)) {
    return value;
  }
  return [value];
};
