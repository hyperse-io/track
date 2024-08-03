import { executeFunction } from '../helpers/helper-execute.js';
import { TrackContext, TrackCreateOptions } from '../types/types-create.js';
import { TrackEventDataBase } from '../types/types-track.js';
import { TrackBuilder } from './track-builder.js';

/**
 * Creates a track builder function.
 *
 * @param options - The track global options.
 * @returns A promise that resolves to the initialized track builder.
 * @template Context - The type of the track context.
 * @template EventData - The type of the track event value.
 */
export const createTrackBuilder = async <
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
>(
  options: TrackCreateOptions<Context, EventData> = {}
) => {
  const { eventData, logger, createData } = options;

  const ctx = {
    data: {},
    logger: logger,
  };

  if (createData) {
    ctx.data = await executeFunction(createData, eventData);
  }

  const trackBuilder = new TrackBuilder<Context, EventData>(
    ctx as Context,
    eventData
  );

  return trackBuilder.initBuilder();
};
