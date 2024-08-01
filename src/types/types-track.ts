import { FormatStrategy } from '../logger/format-strategy.js';
import { TrackAdapter } from './types-adapter.js';

export type TrackTransformFunction<T, V> = (
  ctx: T,
  options: V
) => V | Promise<V>;

export type TrackSelectOptions<T, V, N> =
  | N
  | N[]
  | ((
      ctx: T,
      adapterMap: TrackAdapterMap<T, V>
    ) => N | N[] | Promise<N> | Promise<N[]>);

export type TrackEventDataBase = {
  [eventType: string]: any;
};

export type TrackAdapterMap<T, V> = {
  [name: string]: TrackAdapter<T, V>;
};

export type TrackOptions<T, V> = {
  createCtx: () => T | Promise<T>;
  eventData?: Partial<V>;
  formatStrategy?: FormatStrategy<unknown>;
};
