import { pipe } from '@hyperse/pipeline';
import { defaultTrackTransform } from '../constant/track-func.js';
import { TrackContext } from '../types/types-create.js';
import {
  TrackEventDataBase,
  TrackTransformFunction,
} from '../types/types-track.js';
import { deepMerge } from './helper-deep-merge.js';

/**
 * Executes a track transform function with the provided context and event data.
 *
 * @template Context - The type of the track context.
 * @template EventData - The type of the track event data.
 * @param {Context} ctx - The track context.
 * @param {EventData} eventData - The track event data.
 * @param {Partial<EventData>} globalEventData - The global event data to merge with the event data.
 * @param {TrackTransformFunction<Context, EventData>} transformFunction - The track transform function to execute.
 * @returns {Promise<EventData>} - The transformed event data.
 */
export const executeTrackTransform = async <
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
>(
  ctx: Context,
  eventData: EventData,
  globalEventData: Partial<EventData> = {},
  transformFunction: TrackTransformFunction<
    Context,
    EventData
  > = defaultTrackTransform
): Promise<EventData> => {
  const result = await pipe(() => {
    const finalOptions = deepMerge(globalEventData || {}, eventData);
    return transformFunction(ctx, finalOptions as EventData);
  })();
  return result;
};
