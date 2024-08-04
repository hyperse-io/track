import { TrackContext } from '../types/types-create.js';
import {
  TrackAdapterMap,
  TrackEventDataBase,
  TrackSelectFunction,
} from '../types/types-track.js';
import { ensureArray } from './helper-ensure-array.js';
import { executeFunction } from './helper-execute.js';
import { isFunction } from './helper-is-function.js';

/**
 * Executes the select rule to filter and return a subset of the track adapter map.
 *
 * @param ctx - The track context.
 * @param adapterMap - The track adapter map.
 * @param selectRule - The select rule function or array of adapter names.
 * @returns A promise that resolves to the filtered track adapter map.
 */
export const executeSelect = async <
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
>(
  ctx: Context,
  adapterMap: TrackAdapterMap<Context, EventData>,
  selectRule: TrackSelectFunction<Context, EventData, unknown> = []
): Promise<TrackAdapterMap<Context, EventData>> => {
  let names = [];

  if (isFunction(selectRule)) {
    names = await executeFunction(
      selectRule as (...args: any[]) => any,
      ctx,
      adapterMap
    );
  } else {
    names = ensureArray(selectRule);
  }

  if (names.length === 0) {
    names = Object.keys(adapterMap);
  }

  const lasterAdapterMap: TrackAdapterMap<Context, EventData> = {};
  for (const [adapterName, adapter] of Object.entries(adapterMap)) {
    const isTrackable = await executeFunction(adapter.isTrackable);
    if (isTrackable && names.includes(adapterName)) {
      lasterAdapterMap[adapterName] = adapterMap[adapterName];
    }
  }
  return lasterAdapterMap;
};
