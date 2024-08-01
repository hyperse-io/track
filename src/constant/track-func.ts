/**
 * A default track transform function.
 *
 * @param _ The input value of type T.
 * @param options The options of type V.
 * @returns The transformed options of type V.
 */
export const defaultTrackTransform = <T, V>(_: T, options: V): V => {
  return options;
};
