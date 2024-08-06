import { createAdapterBuilder } from '../../../src/adapter/create-adapter-builder.js';
import {
  TrackAdapterOptions,
  TrackContext,
} from '../../../src/types/types-create.js';
import { EventDataOption } from '../types/type-event.js';
import { TrackData } from '../types/type-track-data.js';
import { ReportAdapter } from './report-adapter.js';

export const defaultAdapterBuilder =  () => {
  const adapter = new ReportAdapter();

  return  createAdapterBuilder<
    TrackContext<TrackData>,
    EventDataOption,
    TrackAdapterOptions<TrackContext<TrackData>, EventDataOption>
  >(adapter);

};
