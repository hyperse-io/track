import type { TrackContext } from '@hyperse/track';
import { createAdapterBuilder, createTrackBuilder } from '@hyperse/track';
import { ReportAdapter } from './report-adapter';
import type {
  ReportAdapterOptions,
  ReportEventData,
  ReportRealEventData,
  ReportTrackData,
} from './types';

export const reportTrack = () => {
  const reportAdapter = new ReportAdapter();

  const adapterBuilder = createAdapterBuilder<
    TrackContext<ReportTrackData>,
    ReportEventData,
    ReportAdapterOptions<
      TrackContext<ReportTrackData>,
      ReportEventData,
      ReportRealEventData
    >,
    ReportRealEventData
  >(reportAdapter);

  const adapter = adapterBuilder
    .setup(() => {
      return {
        timeStamp: Date.now(),
      };
    })
    .before((ctx, eventType, eventData) => {
      console.log('before', ctx, eventType, eventData);
    })
    .transform(['addCart', 'real_addCart'], (_, __, eventData) => {
      if (eventData) {
        return [eventData];
      }
      return [];
    })
    .transform(['addCartList', 'real_addCart'], (_, __, eventData) => {
      return eventData || [];
    })
    .transform('pv', (_, __, eventData) => {
      return eventData;
    })
    .after((ctx, eventType, reportData) => {
      console.log('after', ctx, eventType, reportData);
    })
    .build();

  const trackBuilder = createTrackBuilder<
    TrackContext<ReportTrackData>,
    ReportEventData
  >({
    createData: {
      env: 'prod',
      platform: 'ios',
      ip: '0.0.0.0',
    },
  });

  return trackBuilder
    .init({
      reportAdapter: adapter,
    })
    .before((ctx) => {
      console.log('before track', ctx);
    })
    .after((ctx) => {
      console.log('after track', ctx);
    });
};
