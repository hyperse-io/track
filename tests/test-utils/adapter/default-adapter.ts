import { createAdapterBuilder } from '../../../src/adapter/create-adapter-builder.js';
import {
  TrackAdapterOptions,
  TrackContext,
} from '../../../src/types/types-create.js';
import { EventDataOption } from '../types/type-event.js';
import { TrackData } from '../types/type-track-data.js';
import { ReportAdapter } from './report-adapter.js';

export const defaultAdapter = () => {
  const adapter = new ReportAdapter();
  const adapterBuilder = createAdapterBuilder<
    TrackContext<TrackData>,
    EventDataOption,
    TrackAdapterOptions<TrackContext<TrackData>, EventDataOption>
  >(adapter);

  return adapterBuilder
    .transform('addCart', (ctx, eventType, eventData) => {
      return eventData;
    })
    .transform('previewGoods', (ctx, eventType, eventData) => {
      return eventData;
    })
    .transform('registry', (ctx, eventType, eventData) => {
      return eventData;
    })
    .transform('timeStamp', (ctx, eventType, eventData) => {
      return eventData;
    })
    .build();
};
