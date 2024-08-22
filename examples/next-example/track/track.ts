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
        eventType,
        goodName: 'ac_' + eventData?.goodsName,
        goodsId: 'ac_' + eventData?.goodsId,
        price: eventData?.price,
      };
    })
    .transform('pv', (ctx, eventType, eventData) => {
      return {
        eventType,
        url: eventData?.url,
        timeStamp: 'pv_' + eventData?.timeStamp,
        userName: 'pv_' + eventData?.userName,
        userId: 'pv_' + eventData?.userId,
      };
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
