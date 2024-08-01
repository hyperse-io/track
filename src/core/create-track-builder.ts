import { pipe } from '@hyperse/pipeline';
import { configLogger } from '../logger/create-logger.js';
import { TrackEventDataBase, TrackOptions } from '../types/types-track.js';
import { Track } from './track.js';
import { TrackBuilder } from './track-build.js';

/**
 * Creates a track builder function.
 *
 * @param option - The track global options.
 * @returns A promise that resolves to the initialized track builder.
 * @template T - The type of the track context.
 * @template V - The type of the track event value.
 */
export const createTrackBuilder = async <T, V extends TrackEventDataBase>(
  option: TrackOptions<Readonly<T>, V>
) => {
  const { createCtx, eventData, formatStrategy } = option;

  if (formatStrategy) {
    configLogger(formatStrategy);
  }

  const ctx = await pipe(() => createCtx())();
  const trackInstance = new Track<Readonly<T>, V>(ctx, eventData);
  const trackBuilder = new TrackBuilder<Readonly<T>, V>(trackInstance);

  return trackBuilder.initBuilder();
};
