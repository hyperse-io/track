import { TrackAdapter } from './types-adapter.js';
import { TrackContext } from './types-create.js';

/**
 * A function that is executed before tracking
 * @template Context - The type of the track context.
 * @param ctx - The track context.
 */
export type TrackBeforeFunction<Context extends TrackContext<any>> = (
  ctx: Context
) => void | Promise<void>;

/**
 * A function that is executed after a track event
 * @template Context The type of the track context.
 * @param ctx The track context.
 */
export type TrackAfterFunction<Context extends TrackContext<any>> = (
  ctx: Context
) => void | Promise<void>;

/**
 * A function that selects a track adapter from a given context, event data, and adapter map.
 *
 * @template Context - The type of the track context.
 * @template EventData - The type of the track event data.
 * @template AdapterMap - The type of the track adapter map.
 */
export type TrackSelectFunction<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
  AdapterMap extends TrackAdapterMap<Context, EventData>,
> =
  | keyof AdapterMap
  | (keyof AdapterMap)[]
  | ((
      ctx: Context,
      adapterMap: AdapterMap
    ) =>
      | keyof AdapterMap
      | (keyof AdapterMap)[]
      | Promise<keyof AdapterMap | (keyof AdapterMap)[]>);

/**
 * The base type for track event data.
 */
export type TrackEventDataBase = {
  [eventType: string]: any;
};

/**
 * A map of track adapters.
 *
 * @template Context - The type of the track context.
 * @template EventData - The type of the track event data.
 */
export type TrackAdapterMap<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
> = {
  [name: string]: TrackAdapter<Context, EventData, any, any>;
};
