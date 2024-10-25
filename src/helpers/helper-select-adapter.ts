import type { TrackContext } from '../types/types-create.js';
import type {
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
  TrackMap extends TrackAdapterMap<Context, EventData>,
>(
  ctx: Context,
  adapterMap: TrackMap,
  selectRule: TrackSelectFunction<Context, EventData, TrackMap> = []
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
    if (names.includes(adapterName)) {
      lasterAdapterMap[adapterName] = adapter;
    }
  }
  return lasterAdapterMap;
};
