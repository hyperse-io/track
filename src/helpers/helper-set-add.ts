/**
 * Adds one or more elements to a WeakSet.
 *
 * @template T - The type of the elements in the WeakSet.
 * @param {Set<T>} set - The Set to add elements to.
 * @param {T | T[]} fns - The element(s) to add to the WeakSet.
 */
export const setAdd = <T extends WeakKey>(set: Set<T>, fns: T | T[]) => {
  if (Array.isArray(fns)) {
    fns.forEach((f) => set.add(f));
  } else {
    set.add(fns);
  }
};
