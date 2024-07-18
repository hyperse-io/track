/**
 * Adds one or more elements to a WeakSet.
 *
 * @template T - The type of the elements in the WeakSet.
 * @param {WeakSet<T>} set - The WeakSet to add elements to.
 * @param {T | T[]} fns - The element(s) to add to the WeakSet.
 */
export const weakSetAdd = <T extends WeakKey>(
  set: WeakSet<T>,
  fns: T | T[]
) => {
  if (Array.isArray(fns)) {
    fns.forEach((f) => set.add(f));
  } else {
    set.add(fns);
  }
};
