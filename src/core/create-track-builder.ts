import { TrackContext, TrackCreateOptions } from '../types/types-create.js';
import { TrackEventDataBase } from '../types/types-track.js';
import { TrackBuilder } from './track-builder.js';

/**
 * Creates a track builder instance.
 *
 * @template Context - The type of the track context.
 * @template EventData - The type of the track event data.
 * @param options - The options for creating the track builder.
 * @returns A new instance of the TrackBuilder class.
 */
export const createTrackBuilder = <
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
>(
  options: TrackCreateOptions<Context, EventData> = {}
) => {
  return new TrackBuilder<Context, EventData>(options);
};
