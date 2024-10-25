import { createAdapterBuilder } from '../../../src/adapter/create-adapter-builder.js';
import type {
  TrackAdapterOptions,
  TrackContext,
} from '../../../src/types/types-create.js';
import type { EventDataOption } from '../types/type-event.js';
import type { TrackData } from '../types/type-track-data.js';
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
