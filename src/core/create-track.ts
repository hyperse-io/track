import { pipe } from '@hyperse/pipeline';
import { TrackOptions } from '../types/types-track.js';
import { Track } from './track.js';

/**
 * Creates a new track with the given options.
 *
 * @param option - The options for creating the track.
 * @returns A promise that resolves to a new track.
 * @template T - The type of the track context.
 * @template V - The type of the track input.
 */
export const createTrack = async <T, V>(
  option: TrackOptions<T, V>
): Promise<Track<T, V>> => {
  const { createCtx, ...otherOptions } = option;
  const ctx = await pipe(() => createCtx())();
  return new Track<T, V>(ctx, otherOptions as Partial<V>);
};
