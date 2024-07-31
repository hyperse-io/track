export const moduleName = '@hyperse/track';

export const defaultTrackTransform = <T, V>(_: T, options: V): V => {
  return options;
};
