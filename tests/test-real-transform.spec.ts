import { createAdapterBuilder } from '../src/adapter/create-adapter-builder.js';
import { createTrackBuilder } from '../src/index.js';
import { TrackContext } from '../src/types/types-create.js';
import { AnalyzerAdapter } from './test-utils/adapter/analyzer-adapter.js';
import { ConsoleLogger } from './test-utils/console-logger.js';
import { AdapterRealOptions } from './test-utils/types/type-adapter-options.js';
import {
  EventDataOption,
  RealEventDataOption,
} from './test-utils/types/type-event.js';
import { TrackData } from './test-utils/types/type-track-data.js';

describe('test-real-transform.spec', () => {
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
    addCartList: [
      {
        price: 99.99,
        goodsId: 'g123',
        goodsName: 'Sample Goods',
        count: 2,
      },
      {
        price: 125.5,
        goodsId: 'T10001',
        goodsName: 'T shirt',
        count: 10,
      },
    ],
  };

  const setupData = {
    name: 'setup' as const,
    timeStamp: new Date().getTime(),
    user: 'admin',
  };

  const analyzerAdapter = new AnalyzerAdapter();

  const adapterBuilder = createAdapterBuilder<
    TrackContext<TrackData>,
    EventDataOption,
    AdapterRealOptions<
      TrackContext<TrackData>,
      EventDataOption,
      RealEventDataOption
    >,
    RealEventDataOption
  >(analyzerAdapter);

  const isTrackableFun = vi.fn((ctx, eventType, reportData) => {
    return eventType !== '_timeStamp';
  });
  vi.spyOn(analyzerAdapter, 'isTrackable').mockImplementation(isTrackableFun);

  const reportFun = vi.fn((ctx, eventType, reportData, setupData) => {});
  vi.spyOn(analyzerAdapter, 'report').mockImplementation(reportFun);

  const adapter = adapterBuilder
    .setup((ctx, eventType, eventData) => setupData)
    .before((ctx, eventType, eventData) => {})
    .transform(['addCart', '_addCart'], async (ctx, eventType, eventData) => {
      if (eventData) {
        return [
          {
            _price: eventData.price,
            _goodsId: eventData.goodsId,
            _goodsName: eventData.goodsName,
            _count: eventData.count,
          },
        ];
      }
      return [];
    })
    .transform(
      ['addCartList', '_addCart'],
      async (ctx, eventType, eventData) => {
        if (eventData) {
          return eventData.map((item) => {
            return {
              _price: item.price,
              _goodsId: item.goodsId,
              _goodsName: item.goodsName,
              _count: item.count,
            };
          });
        }
        return [];
      }
    )
    .transform(['registry', '_registry'], (ctx, eventType, eventData) => {
      if (!eventData) {
        return;
      }
      return {
        _userName: eventData?.userName,
        _mobile: eventData?.mobile,
        _pwd: eventData?.pwd,
        _email: eventData?.email,
      };
    })
    .transform(
      ['previewGoods', '_previewGoods'],
      (ctx, eventType, eventData) => {
        if (!eventData) {
          return;
        }
        return {
          _goodsId: eventData.goodsId,
          _goodsName: eventData.goodsName,
          _url: 'https://example.com',
          timeStamp: '2021-09-01T00:00:00Z',
        };
      }
    )
    .transform(
      ['timeStamp', '_timeStamp'],
      (ctx, eventType, eventData) => eventData
    )
    .after((ctx, eventType, reportData) => {})
    .build();

  it(`['addCart', '_addCart']`, async () => {
    reportFun.mockClear();
    isTrackableFun.mockClear();
    await adapter.track(
      'reportAdapter',
      {
        data: trackData,
        logger: new ConsoleLogger(),
      },
      'addCart',
      eventData.addCart
    );

    expect(isTrackableFun.mock.lastCall).toBeDefined();
    expect(isTrackableFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(isTrackableFun.mock.lastCall?.[1]).toBe('_addCart');
    expect(isTrackableFun.mock.lastCall?.[2]).toMatchObject([
      {
        _price: eventData.addCart?.price,
        _goodsId: eventData.addCart?.goodsId,
        _goodsName: eventData.addCart?.goodsName,
        _count: eventData.addCart?.count,
      },
    ]);

    expect(reportFun.mock.lastCall).toBeDefined();
    expect(reportFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(reportFun.mock.lastCall?.[1]).toBe('_addCart');
    expect(reportFun.mock.lastCall?.[2]).toMatchObject([
      {
        _price: eventData.addCart?.price,
        _goodsId: eventData.addCart?.goodsId,
        _goodsName: eventData.addCart?.goodsName,
        _count: eventData.addCart?.count,
      },
    ]);
    expect(reportFun.mock.lastCall?.[3]).toMatchObject(setupData);
  });

  it(`['addCartList', '_addCart']`, async () => {
    reportFun.mockClear();
    isTrackableFun.mockClear();
    await adapter.track(
      'reportAdapter',
      {
        data: trackData,
        logger: new ConsoleLogger(),
      },
      'addCartList',
      eventData.addCartList
    );

    expect(isTrackableFun.mock.lastCall).toBeDefined();
    expect(isTrackableFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(isTrackableFun.mock.lastCall?.[1]).toBe('_addCart');
    expect(isTrackableFun.mock.lastCall?.[2]).toMatchObject([
      {
        _price: eventData.addCartList?.[0]?.price,
        _goodsId: eventData.addCartList?.[0]?.goodsId,
        _goodsName: eventData.addCartList?.[0]?.goodsName,
        _count: eventData.addCartList?.[0]?.count,
      },
      {
        _price: eventData.addCartList?.[1]?.price,
        _goodsId: eventData.addCartList?.[1]?.goodsId,
        _goodsName: eventData.addCartList?.[1]?.goodsName,
        _count: eventData.addCartList?.[1]?.count,
      },
    ]);

    expect(reportFun.mock.lastCall).toBeDefined();
    expect(reportFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(reportFun.mock.lastCall?.[1]).toBe('_addCart');
    expect(reportFun.mock.lastCall?.[2]).toMatchObject([
      {
        _price: eventData.addCartList?.[0]?.price,
        _goodsId: eventData.addCartList?.[0]?.goodsId,
        _goodsName: eventData.addCartList?.[0]?.goodsName,
        _count: eventData.addCartList?.[0]?.count,
      },
      {
        _price: eventData.addCartList?.[1]?.price,
        _goodsId: eventData.addCartList?.[1]?.goodsId,
        _goodsName: eventData.addCartList?.[1]?.goodsName,
        _count: eventData.addCartList?.[1]?.count,
      },
    ]);
    expect(reportFun.mock.lastCall?.[3]).toMatchObject(setupData);
  });

  it(`['registry', '_registry']`, async () => {
    reportFun.mockClear();
    isTrackableFun.mockClear();
    await adapter.track(
      'reportAdapter',
      {
        data: trackData,
        logger: new ConsoleLogger(),
      },
      'registry',
      eventData.registry
    );

    expect(isTrackableFun.mock.lastCall).toBeDefined();
    expect(isTrackableFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(isTrackableFun.mock.lastCall?.[1]).toBe('_registry');
    expect(isTrackableFun.mock.lastCall?.[2]).toMatchObject({
      _userName: eventData.registry?.userName,
      _mobile: eventData.registry?.mobile,
      _pwd: eventData.registry?.pwd,
      _email: eventData.registry?.email,
    });

    expect(reportFun.mock.lastCall).toBeDefined();
    expect(reportFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(reportFun.mock.lastCall?.[1]).toBe('_registry');
    expect(reportFun.mock.lastCall?.[2]).toMatchObject({
      _userName: eventData.registry?.userName,
      _mobile: eventData.registry?.mobile,
      _pwd: eventData.registry?.pwd,
      _email: eventData.registry?.email,
    });
    expect(reportFun.mock.lastCall?.[3]).toMatchObject(setupData);
  });

  it(`['previewGoods', '_previewGoods']`, async () => {
    reportFun.mockClear();
    isTrackableFun.mockClear();
    await adapter.track(
      'reportAdapter',
      {
        data: trackData,
        logger: new ConsoleLogger(),
      },
      'previewGoods',
      eventData.previewGoods
    );

    expect(isTrackableFun.mock.lastCall).toBeDefined();
    expect(isTrackableFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(isTrackableFun.mock.lastCall?.[1]).toBe('_previewGoods');
    expect(isTrackableFun.mock.lastCall?.[2]).toMatchObject({
      _goodsId: eventData.previewGoods?.goodsId,
      _goodsName: eventData.previewGoods?.goodsName,
      _url: 'https://example.com',
      timeStamp: '2021-09-01T00:00:00Z',
    });

    expect(reportFun.mock.lastCall).toBeDefined();
    expect(reportFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(reportFun.mock.lastCall?.[1]).toBe('_previewGoods');
    expect(reportFun.mock.lastCall?.[2]).toMatchObject({
      _goodsId: eventData.previewGoods?.goodsId,
      _goodsName: eventData.previewGoods?.goodsName,
      _url: 'https://example.com',
      timeStamp: '2021-09-01T00:00:00Z',
    });
    expect(reportFun.mock.lastCall?.[3]).toMatchObject(setupData);
  });

  it(`['timeStamp', '_timeStamp']`, async () => {
    reportFun.mockClear();
    isTrackableFun.mockClear();
    await adapter.track(
      'reportAdapter',
      {
        data: trackData,
        logger: new ConsoleLogger(),
      },
      'timeStamp',
      eventData.timeStamp
    );

    const trackBuilder = createTrackBuilder<
      TrackContext<TrackData>,
      EventDataOption
    >();

    expect(isTrackableFun.mock.lastCall).toBeDefined();
    expect(isTrackableFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(isTrackableFun.mock.lastCall?.[1]).toBe('_timeStamp');
    expect(isTrackableFun.mock.lastCall?.[2]).toBe(eventData.timeStamp);
    expect(isTrackableFun.mock.results?.[0]?.value).toBe(false);

    // The report function should not be called because the event type is not trackable
    expect(reportFun.mock.lastCall).toBeUndefined();
  });

  it(`test IsEventOfReportDataEqual`, async () => {
    reportFun.mockClear();
    isTrackableFun.mockClear();
    expect(
      analyzerAdapter.testIsEventOfReportDataEqual(
        '_registry',
        eventData?.registry,
        '_registry'
      )
    ).toBeTruthy();

    expect(
      analyzerAdapter.testIsEventOfReportDataEqual(
        '_registry',
        eventData?.registry,
        '_addCart'
      )
    ).toBe(false);
  });
});
