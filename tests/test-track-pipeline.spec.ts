import { createAdapterBuilder } from '../src/adapter/create-adapter-builder.js';
import { createTrackBuilder } from '../src/core/create-track-builder.js';
import { TrackContext } from '../src/types/types-create.js';
import { ReportAdapter } from './fixtures/adapter/report-adapter.js';
import { AdapterOptions } from './fixtures/types/type-adapter-options.js';
import { EventDataOption } from './fixtures/types/type-event.js';
import { TrackData } from './fixtures/types/type-track-data.js';

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

  it('test track sample pipeline', async () => {
    const adapter = new ReportAdapter();

    const adapterBuilder = createAdapterBuilder<
      TrackContext<TrackData>,
      EventDataOption,
      AdapterOptions<TrackContext<TrackData>, EventDataOption>
    >(adapter);

    adapterBuilder
      .before(async (ctx, eventType, eventData) => {
        console.log('before');
      })
      .transform('addCart', (ctx, eventType, eventData) => {
        return {
          ...eventData,
          pay: {
            payId: 'p123',
            payName: 'Sample Pay',
            payType: 'credit',
          },
          timeStamp: '2024-09-01T00:00:00Z',
        };
      })
      .after(async (ctx, eventType, eventData) => {
        console.log('after', eventData);
      })
      .build();

    const trackBuilder = createTrackBuilder<
      TrackContext<TrackData>,
      EventDataOption
    >();

    await trackBuilder
      .init(() => {
        return { reportAdapter: adapter };
      })
      .before(async (ctx) => {
        console.log('before');
      })
      .after(async (ctx) => {
        console.log('after');
      })
      .select('reportAdapter')
      .track('addCart', eventData.addCart);

    expect(true).toBeTruthy();
  });

  it('test track pipeline', async () => {
    const reportAdapter = new ReportAdapter();
    const adapterBuilder = createAdapterBuilder<
      TrackContext<TrackData>,
      EventDataOption,
      AdapterOptions<TrackContext<TrackData>, EventDataOption>
    >(reportAdapter);

    const adBeforeFun = vi.fn(async (ctx, eventType, eventData) => {});
    const adAfterFun = vi.fn(async (ctx) => {});
    const adTransformFun = vi.fn((ctx, eventType, eventData) => {
      return {
        ...eventData,
        pay: {
          payId: 'p123',
          payName: 'Sample Pay',
          payType: 'credit',
        },
        timeStamp: '2024-09-01T00:00:00Z',
      };
    });

    const adapter = adapterBuilder
      .before(adBeforeFun)
      .transform('previewGoods', adTransformFun)
      .after(adAfterFun)
      .build();

    const traBeforeFun = vi.fn(async (ctx) => {});
    const traAfterFun = vi.fn(async (ctx) => {});

    const adapterMap = {
      consoleAdapter: adapter,
      reportAdapter: adapter,
    };
    type Name = keyof typeof adapterMap;

    const traInitFun = vi.fn(() => {
      return adapterMap;
    });
    const traSelectFun = vi.fn((ctx, adapterMap): Name | Name[] => [
      'reportAdapter',
    ]);

    const trackBuilder = createTrackBuilder<
      TrackContext<TrackData>,
      EventDataOption
    >({
      createData(eventData) {
        return Promise.resolve(trackData);
      },
    });

    await trackBuilder
      .init(traInitFun)
      .before(traBeforeFun)
      .after(traAfterFun)
      .select(traSelectFun)
      .track('previewGoods', eventData.previewGoods);

    expect(traBeforeFun.mock.lastCall).toBeDefined();
    expect(traBeforeFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(traAfterFun.mock.lastCall).toBeDefined();
    expect(traAfterFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });

    expect(traInitFun.mock.results[0]).toBeDefined();
    expect(traInitFun.mock.results[0].value).toMatchObject(adapterMap);

    expect(traSelectFun.mock.lastCall).toBeDefined();
    expect(traSelectFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(traSelectFun.mock.lastCall?.[1]).toMatchObject(adapterMap);
    expect(traSelectFun.mock.results[0].value).toMatchObject(['reportAdapter']);

    expect(adBeforeFun.mock.lastCall).toBeDefined();
    expect(adBeforeFun.mock.lastCall?.[0]).toMatchObject({ data: trackData });
    expect(adBeforeFun.mock.lastCall?.[1]).toEqual('previewGoods');
    expect(adBeforeFun.mock.lastCall?.[2]).toMatchObject({
      ...eventData.previewGoods,
    });

    expect(adTransformFun.mock.lastCall).toBeDefined();
    expect(adTransformFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(adTransformFun.mock.lastCall?.[1]).toBe('previewGoods');
    expect(adTransformFun.mock.lastCall?.[2]).toMatchObject({
      ...eventData.previewGoods,
    });
    expect(adTransformFun.mock.results[0].value).toMatchObject({
      ...eventData.previewGoods,
      pay: {
        payId: 'p123',
        payName: 'Sample Pay',
        payType: 'credit',
      },
      timeStamp: '2024-09-01T00:00:00Z',
    });
  });
});
