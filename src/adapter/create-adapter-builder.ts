import { TrackAdapter } from '../types/types-adapter.js';
import { TrackEventDataBase } from '../types/types-track.js';
import { AdapterBuilder } from './adapter-builder.js';
import { ReportAdapter } from './adapter-report.js';

/**
 * Creates an adapter builder for track events.
 *
 * @param adapter - Optional track adapter to use. If not provided, a default `ReportAdapter` will be used.
 * @returns A promise that resolves to an initialized adapter builder.
 */
export const createAdapterBuilder = async <T, V extends TrackEventDataBase>(
  adapter?: TrackAdapter<Readonly<T>, V>
) => {
  let reportAdapter: TrackAdapter<Readonly<T>, V>;
  if (!adapter) {
    reportAdapter = new ReportAdapter<Readonly<T>, V>();
  } else {
    reportAdapter = adapter;
  }
  const adapterBuilder = new AdapterBuilder<Readonly<T>, V>(reportAdapter);

  return adapterBuilder.initBuilder();
};
