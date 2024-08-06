import { TrackLogger } from './types-logger.js';
import { TrackEventDataBase } from './types-track.js';

/**
 * A function that creates track data.
 * @template Context - The type of the track context.
 * @template EventData - The type of the track event data.
 * @param eventData - Optional partial event data.
 * @returns The track data or a promise that resolves to the track data.
 */
export type TrackCreateDataFunction<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
> = (
  eventData?: Partial<EventData>
) => Context['data'] | Promise<Context['data']>;

/**
 * The options for creating a track.
 *
 * @template Context - The type of the track context.
 * @template EventData - The type of the track event data.
 */
export type TrackCreateOptions<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
> = {
  eventData?: Partial<EventData>;
  createData?: Context['data'] | TrackCreateDataFunction<Context, EventData>;
} & Omit<TrackContext<any>, 'data'>;

/**
 * The context for a track.
 *
 * @template TrackData - The type of data associated with the track.
 */
export type TrackContext<TrackData> = {
  data: Readonly<TrackData>;
  logger?: TrackLogger<any>;
};

/**
 * Options for the track adapter.
 *
 * @template Context - The type of the track context.
 * @template EventData - The type of the track event data.
 */
export type TrackAdapterOptions<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
> = {
  /**
   * The adapter hook Performs data consolidation against the rules defined by AdapterOptions
   * Passes the returned results to report
   * Executes before the report function is called
   *
   * @param ctx - The track context.
   * @param eventData - The event data.
   * @returns A value or a promise that resolves to a value.
   */
  setup?: (
    ctx: Context,
    eventData: EventData[keyof EventData]
  ) => any | Promise<any>;
};
