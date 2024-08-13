import { createAdapterBuilder } from '../src/adapter/create-adapter-builder.js';
import { createTrackBuilder } from '../src/core/create-track-builder.js';
import { AdapterReportData } from '../src/types/types-adapter.js';
import { TrackContext } from '../src/types/types-create.js';
import { ReportAdapter } from './test-utils/adapter/report-adapter.js';
import { AdapterOptions } from './test-utils/types/type-adapter-options.js';
import { EventDataOption } from './test-utils/types/type-event.js';
import { TrackData } from './test-utils/types/type-track-data.js';

describe('test-track-pipeline.spec', () => {
  const trackData: TrackData = {
    bizMode: 'test',
    env: 'prod',
    platform: 'android',
    ip: '0.0.0.0',
    userId: 'uuid_10001',
  };

  const eventData: EventDataOption = {
    registry: {
      userName: 'testUser',
      mobile: '1234567890',
      pwd: 'password123',
      email: 'testuser@example.com',
    },
    previewGoods: {
      goodsId: 'g123',
      goodsName: 'Sample Goods',
    },
    addCart: {
      price: 99.99,
      goodsId: 'g123',
      goodsName: 'Sample Goods',
      count: 2,
    },
    timeStamp: '1000',
  };

  it('docs example', async () => {
    const adapter = new ReportAdapter();

    const adapterBuilder = createAdapterBuilder<
      TrackContext<TrackData>,
      EventDataOption,
      AdapterOptions<TrackContext<TrackData>, EventDataOption>
    >(adapter);

    adapterBuilder
      .setup(
        (
          ctx: TrackContext<TrackData>,
          eventType: keyof EventDataOption,
          eventData: EventDataOption[keyof EventDataOption]
        ) => {
          return Promise.resolve({
            name: 'setup',
            timeStamp: Date.now(),
          });
        }
      )
      .before(
        (
          ctx: TrackContext<TrackData>,
          eventType: keyof EventDataOption,
          eventData: EventDataOption[keyof EventDataOption]
        ) => {
          //do something
        }
      )
      .transform(
        'addCart',
        (
          ctx: TrackContext<TrackData>,
          eventType: 'addCart',
          eventData: EventDataOption['addCart']
        ) => {
          return {
            ...eventData,
            goodName: 'ac_' + eventData?.goodsName,
            timeStamp: Date.now(),
          };
        }
      )
      .transform(
        'previewGoods',
        (
          ctx: TrackContext<TrackData>,
          eventType: 'previewGoods',
          eventData: EventDataOption['previewGoods']
        ) => {
          return {
            ...eventData,
            goodName: 'pg_' + eventData?.goodsName,
            timeStamp: Date.now(),
          };
        }
      )
      .after(
        (
          ctx: TrackContext<TrackData>,
          eventType: keyof EventDataOption,
          reportData: AdapterReportData
        ) => {
          //do something
        }
      )
      .build();

    const trackBuilder = createTrackBuilder<
      TrackContext<TrackData>,
      EventDataOption
    >();

    await trackBuilder
      .init(() => {
        return { reportAdapter: adapter, consoleAdapter: adapter };
      })
      .before(async (ctx) => {
        // do something
      })
      .after(async (ctx) => {
        // do something
      })
      .select(
        (
          ctx: TrackContext<TrackData>,
          adapterMap: {
            reportAdapter: ReportAdapter;
            consoleAdapter: ReportAdapter;
          }
        ) => 'consoleAdapter'
      )
      .track('addCart', {
        price: 99.99,
        goodsId: 'g123',
        goodsName: 'Sample Goods',
        count: 2,
      });

    expect(true).toBeTruthy();
  });
});
