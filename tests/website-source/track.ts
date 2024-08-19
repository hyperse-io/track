import { createAdapterBuilder, createTrackBuilder } from '../../src/index.js';
import { TrackContext } from '../../src/types/types-create.js';
import { ReportAdapter } from './report-adapter.js';
import {
  ReportAdapterOptions,
  ReportEventData,
  ReportTrackData,
} from './types.js';

export const reportTrack = () => {
  const reportAdapter = new ReportAdapter();

  const adapterBuilder = createAdapterBuilder<
    TrackContext<ReportTrackData>,
    ReportEventData,
    ReportAdapterOptions<TrackContext<ReportTrackData>, ReportEventData>
  >(reportAdapter);

  const adapter = adapterBuilder
    .setup(() => {
      return Promise.resolve({
        name: 'setup',
        timeStamp: Date.now(),
      });
    })
    .before((ctx, eventType, eventData) => {
      console.log('before', ctx, eventType, eventData);
    })
    .transform('addCart', (ctx, eventType, eventData) => {
      return {
        ...eventData,
        goodName: 'ac_' + eventData?.goodsName,
      };
    })
    .transform('registry', (ctx, eventType, eventData) => {
      return { ...eventData, userName: 'rg_' + eventData?.userName };
    })
    .after((ctx, eventType, reportData) => {
      console.log('after', ctx, eventType, reportData);
    })
    .build();

  const trackBuilder = createTrackBuilder<
    TrackContext<ReportTrackData>,
    ReportEventData
  >();

  return trackBuilder
    .init(() => {
      return {
        reportAdapter: adapter,
      };
    })
    .before((ctx) => {
      console.log('before track', ctx);
    })
    .after((ctx) => {
      console.log('after track', ctx);
    });
};
