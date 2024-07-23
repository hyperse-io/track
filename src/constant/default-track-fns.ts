export const defaultGlobalTransform = <T, V>(_: T, options: V): V => {
  return options;
};

export const defaultSelect = <T, A>(_: T, adapterList: Array<A>): Array<A> => {
  return adapterList;
};

export const defaultCreateCtx = <T>(context: T): T => {
  return context;
};
