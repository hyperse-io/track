import { TrackAdapter } from './types-adapter.js';

export type TrackContextFunction<T> = (ctx?: T) => T | Promise<T>;

export type TrackTransformFunction<T, V> = (
  ctx: T,
  options: V
) => V | Promise<V>;

export type TrackFunctionVoid = () => void | Promise<void>;

export type TrackSelectFunction<T, A extends Array<TrackAdapter>> = (
  ctx: T,
  adapterList: A
) => A;

export type TrackContext<T> = T | TrackContextFunction<T>;
