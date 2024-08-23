import { TrackAdapter } from '../types/types-adapter.js';
import { TrackAdapterOptions, TrackContext } from '../types/types-create.js';
import { TrackEventDataBase } from '../types/types-track.js';
import { AdapterBuilder } from './adapter-builder.js';

/**
 * Creates an adapter builder for a given track adapter.
 *
 * @param adapter - The track adapter to build.
 * @returns The initialized adapter builder.
 * @throws Error if the adapter is not provided.
 */
export function createAdapterBuilder<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
  AdapterOptions extends TrackAdapterOptions<Context, EventData, RealEventData>,
  RealEventData extends TrackEventDataBase = EventData,
>(adapter: TrackAdapter<Context, EventData, AdapterOptions, RealEventData>) {
  if (!adapter) {
    throw new Error('Adapter is required');
  }

  const adapterBuilder = new AdapterBuilder<
    Context,
    EventData,
    AdapterOptions,
    RealEventData
  >(adapter);

  return adapterBuilder.init();
}
