import { pipe } from '@hyperse/pipeline';
import { TrackEventValueBase, TrackOptions } from '../types/types-track.js';
import { Track } from './track.js';
import { TrackBuilder } from './track-build.js';

/**
 * Creates a track builder function.
 *
 * @param option - The track options.
 * @returns A promise that resolves to the initialized track builder.
 * @template T - The type of the track context.
 * @template V - The type of the track event value.
 */
export const createTrackBuilder = async <T, V extends TrackEventValueBase>(
  option: TrackOptions<Readonly<T>, V>
) => {
  const { createCtx, globalInput } = option;
  const ctx = await pipe(() => createCtx())();
  const trackInstance = new Track<Readonly<T>, V>(ctx, globalInput);
  const trackBuilder = new TrackBuilder<Readonly<T>, V>(trackInstance);

  return trackBuilder.initBuilder();
};
