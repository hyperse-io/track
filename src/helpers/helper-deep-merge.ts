import { deepClone, isClassInstance, isObject } from './helper-deep-clone.js';

export type DeepPartial<T> = {
  [P in keyof T]?:
    | null
    | (T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer U>
          ? ReadonlyArray<DeepPartial<U>>
          : DeepPartial<T[P]>);
};

const needMerge = (source: unknown, mergeUndefined?: boolean) => {
  return !(typeof source === 'undefined' && !mergeUndefined);
};

/**
 * Deeply merges the properties of two objects.
 *
 * @template T - The type of the target object.
 * @param {T} target - The target object to merge into.
 * @param {DeepPartial<T>} source - The source object to merge from.
 * @param {boolean} [mergeUndefined=false] - Whether to merge undefined values.
 * @param {number} [depth=0] - The current depth of the merge operation.
 * @returns {T} - The merged object.
 */
export const deepMerge = <T>(
  target: T,
  source: DeepPartial<T>,
  mergeUndefined = false,
  depth = 0
): T => {
  if (!source) {
    return target;
  }

  if (depth === 0) {
    target = deepClone(target as any);
  }

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        // `target[key]=true` we also need to assign {} as key
        if (!isObject((target as any)[key])) {
          Object.assign(target, { [key]: {} });
        }
        if (!isClassInstance(source[key])) {
          deepMerge(
            (target as any)[key],
            (source as any)[key],
            mergeUndefined,
            depth + 1
          );
        } else {
          if (needMerge(source[key], mergeUndefined)) {
            (target as any)[key] = source[key];
          }
        }
      } else {
        if (needMerge(source[key], mergeUndefined)) {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
  }
  return target;
};
