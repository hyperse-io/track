export type TrackOptions<T, V> = {
  createCtx: () => T | Promise<T>;
} & Partial<V>;

export type TrackTransformFunction<T, V> = (
  ctx: T,
  options: V
) => V | Promise<V>;

export type TrackFunctionVoid = () => void | Promise<void>;

export type TrackSelectFunction<T, A> = (ctx: T, adapterList: A) => A;
