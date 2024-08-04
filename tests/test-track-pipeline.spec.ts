import { Mock } from 'vitest';
import { createAdapterBuilder } from '../src/adapter/create-adapter-builder.js';
import { createTrackBuilder } from '../src/core/create-track-builder.js';
import { TrackAdapterMap } from '../src/index.js';
import { TrackAdapter } from '../src/types/types-adapter.js';
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

  it('test track pipeline typing', async () => {
    const reportAdapter = new ReportAdapter();
    const adapterBuilder = await createAdapterBuilder<
      TrackContext<TrackData>,
      EventDataOption,
      AdapterOptions<TrackContext<TrackData>, EventDataOption>
    >(reportAdapter);

    const adapter = adapterBuilder
      .setup((ctx, eventData) => {
        return Promise.resolve({
          name: 'setup',
          timeStamp: new Date().getTime(),
        });
      })
      .before((ctx, eventType, eventData) => {})
      .transform((ctx, eventType, eventData) => {
        return {
          ...eventData,
          timeStamp: '2021-09-01T00:00:00Z',
        };
      })
      .after((ctx, eventType, eventData) => {})
      .build();

    const trackBuilder = await createTrackBuilder<
      TrackContext<TrackData>,
      EventDataOption
    >();

    trackBuilder
      .init(() => {
        return {
          reportAdapter: adapter,
          reportAdapter1: adapter,
        };
      })
      .before(({ data, logger }) => {})
      .after((ctx) => {})
      .transform((ctx, eventData) => {
        return eventData;
      })
      .select((ctx, adapterMap) => {
        return ['reportAdapter', 'reportAdapter1'];
      })
      .track('previewGoods', eventData);

    expect(true).toBeTruthy();
  });

  it('test track pipeline', async () => {
    const reportAdapter = new ReportAdapter();
    const adapterBuilder = await createAdapterBuilder<
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
      .transform(adTransformFun)
      .after(adAfterFun)
      .build();

    const traBeforeFun = vi.fn(async (ctx) => {});
    const traAfterFun = vi.fn(async (ctx) => {});
    const traTransformFun = vi.fn((ctx, eventData) => {
      return {
        ...eventData,
        timeStamp: '2021-09-01T00:00:00Z',
      };
    });

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

    const trackBuilder = await createTrackBuilder<
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
      .transform(traTransformFun)
      .select(traSelectFun)
      .track('previewGoods', eventData);

    expect(traBeforeFun.mock.lastCall).toBeDefined();
    expect(traBeforeFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
      logger: undefined,
    });
    expect(traAfterFun.mock.lastCall).toBeDefined();
    expect(traAfterFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
      logger: undefined,
    });

    expect(traTransformFun.mock.lastCall).toBeDefined();
    expect(traTransformFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
      logger: undefined,
    });
    expect(traTransformFun.mock.lastCall?.[1]).toMatchObject(eventData);
    expect(traTransformFun.mock.results[0].value).toMatchObject({
      ...eventData,
      timeStamp: '2021-09-01T00:00:00Z',
    });

    expect(traInitFun.mock.results[0]).toBeDefined();
    expect(traInitFun.mock.results[0].value).toMatchObject(adapterMap);

    expect(traSelectFun.mock.lastCall).toBeDefined();
    expect(traSelectFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
      logger: undefined,
    });
    expect(traSelectFun.mock.lastCall?.[1]).toMatchObject(adapterMap);
    expect(traSelectFun.mock.results[0].value).toMatchObject(['reportAdapter']);

    expect(adBeforeFun.mock.lastCall).toBeDefined();
    expect(adBeforeFun.mock.lastCall?.[0]).toMatchObject({ data: trackData });
    expect(adBeforeFun.mock.lastCall?.[1]).toEqual('previewGoods');
    expect(adBeforeFun.mock.lastCall?.[2]).toMatchObject({
      ...eventData,
      timeStamp: '2021-09-01T00:00:00Z',
    });

    expect(adTransformFun.mock.lastCall).toBeDefined();
    expect(adTransformFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
      logger: undefined,
    });
    expect(adTransformFun.mock.lastCall?.[1]).toEqual('previewGoods');
    expect(adTransformFun.mock.lastCall?.[2]).toMatchObject({
      ...eventData,
      // track transform
      timeStamp: '2021-09-01T00:00:00Z',
    });
    expect(adTransformFun.mock.results[0].value).toMatchObject({
      ...eventData,
      pay: {
        payId: 'p123',
        payName: 'Sample Pay',
        payType: 'credit',
      },
      // adapter transform
      timeStamp: '2024-09-01T00:00:00Z',
    });
  });

  it('test track parallel pipeline', async () => {
    const [reportFn, reportAdapter] = await mockAdapter();

    const [analyzerFn, analyzerAdapter] = await mockAdapter();

    const [consoleFn, consoleAdapter] = await mockAdapter();

    const adapterMap = {
      reportAdapter: reportAdapter,
      analyzerAdapter: analyzerAdapter,
      consoleAdapter: consoleAdapter,
    } as TrackAdapterMap<TrackContext<TrackData>, EventDataOption>;

    const trackBuilder = await createTrackBuilder<
      TrackContext<TrackData>,
      EventDataOption
    >({
      createData(eventData) {
        return trackData;
      },
    });

    const trackBuilderFactory = trackBuilder.init(() => adapterMap);

    const previewGoodsAsync = trackBuilderFactory
      .select('analyzerAdapter')
      .track('previewGoods', eventData);

    const addCartAsync = trackBuilderFactory.track('addCart', eventData);

    const registryAsync = trackBuilderFactory
      .select('consoleAdapter')
      .track('registry', eventData);

    await Promise.all([previewGoodsAsync, addCartAsync, registryAsync]);

    expect(reportFn.mock.results.length).toBe(1);
    expect(reportFn.mock.results[0].value?.['eventKey']).toBe('addCart');

    expect(analyzerFn.mock.results.length).toBe(2);
    expect(analyzerFn.mock.results[0].value?.['eventKey']).toBe('previewGoods');
    expect(analyzerFn.mock.results[1].value?.['eventKey']).toBe('addCart');

    expect(consoleFn.mock.results.length).toBe(2);
    expect(consoleFn.mock.results[0].value?.['eventKey']).toBe('registry');
    expect(consoleFn.mock.results[1].value?.['eventKey']).toBe('addCart');
  });
});

const mockAdapter = async (): Promise<
  [
    Mock<(ctx: any, reportData: any, setupData: any) => any>,
    TrackAdapter<TrackContext<TrackData>, EventDataOption, any>,
  ]
> => {
  const report = vi.fn((ctx: any, reportData: any, setupData: any) => {
    return reportData;
  });

  const reportAdapterBuilder = await createAdapterBuilder<
    TrackContext<TrackData>,
    EventDataOption,
    AdapterOptions<TrackContext<TrackData>, EventDataOption>
  >(new ReportAdapter());
  const reportAdapter = reportAdapterBuilder
    .transform((ctx, eventKey, eventData) => {
      return {
        ...eventData,
        eventKey,
      };
    })
    .build();
  vi.spyOn(reportAdapter as ReportAdapter, 'report').mockImplementation(report);

  return [report, reportAdapter];
};
