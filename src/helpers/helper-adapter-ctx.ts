import { TrackEventDataBase } from '../types/index.js';
import {
  TrackContext,
  TrackCreateDataFunction,
} from '../types/types-create.js';
import { executeFunction } from './helper-execute.js';
import { isFunction } from './helper-is-function.js';

/**
 * Executes the adapter context with optional data creation.
 *
 * @param originalCtx The original context object.
 * @param innerGlobalEventData Optional inner global event data.
 * @param createData Optional data or function to create data.
 * @returns A promise that resolves to the modified context object.
 */
export const executeAdapterCtx = async <
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
>(
  originalCtx: Context,
  innerGlobalEventData?: Partial<EventData>,
  createData?: Context['data'] | TrackCreateDataFunction<Context, EventData>
): Promise<Context> => {
  if (!createData) {
    originalCtx.data = {};
    return originalCtx;
  }

  if (!isFunction(createData)) {
    originalCtx.data = createData;
    return originalCtx;
  }

  const data = await executeFunction(createData, innerGlobalEventData);

  originalCtx.data = data || {};

  return originalCtx;
};
