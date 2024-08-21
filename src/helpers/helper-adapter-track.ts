import { TrackContext } from '../types/types-create.js';
import { TrackAdapterMap, TrackEventDataBase } from '../types/types-track.js';
import { executeFunction } from './helper-execute.js';

/**
 * Executes the track function of each adapter in the adapterMap for the given eventType and result.
 *
 * @template Context - The type of the track context.
 * @template EventData - The type of the track event data.
 * @param {Context} ctx - The track context.
 * @param {TrackAdapterMap<Context, EventData>} adapterMap - The map of adapters.
 * @param {keyof EventData} eventType - The event type.
 * @param {EventData} result - The event data.
 * @returns {Promise<EventData>} - The updated event data.
 */
export const executeAdapterTrack = async <
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
  EventType extends keyof EventData,
>(
  ctx: Context,
  adapterMap: TrackAdapterMap<Context, EventData>,
  eventType: EventType,
  result: EventData[EventType]
): Promise<EventData> => {
  for (const [adapterName, adapter] of Object.entries(adapterMap)) {
    const isTrackable = await executeFunction(
      adapter.isTrackable,
      ctx,
      eventType,
      result
    );

    if (!isTrackable) {
      ctx.logger?.warn(`Adapter is not trackable: ${adapterName}`);
      continue;
    }
    await adapter.track<EventType>(ctx, eventType, result);
  }
  return result;
};
