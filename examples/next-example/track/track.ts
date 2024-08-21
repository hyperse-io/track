import {
  createAdapterBuilder,
  createTrackBuilder,
  TrackContext,
} from '@hyperse/track';
import { ReportAdapter } from './report-adapter';
import {
  ReportAdapterOptions,
  ReportEventData,
  ReportTrackData,
} from './types';

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
        eventType,
        goodName: 'ac_' + eventData?.goodsName,
      };
    })
    .transform('pv', (ctx, eventType, eventData) => {
      return { ...eventData, userName: 'pv_' + eventData?.userName };
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
