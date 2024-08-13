import { createAdapterBuilder } from '../src/adapter/create-adapter-builder.js';
import { TrackContext } from '../src/types/types-create.js';
import { ReportAdapter } from './test-utils/adapter/report-adapter.js';
import { AdapterOptions } from './test-utils/types/type-adapter-options.js';
import { EventDataOption } from './test-utils/types/type-event.js';
import { TrackData } from './test-utils/types/type-track-data.js';

describe('test-adapter.spec', () => {
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
  };

  it('test adapter is undefined', async () => {
    expect(() =>
      createAdapterBuilder<
        TrackContext<TrackData>,
        EventDataOption,
        AdapterOptions<TrackContext<TrackData>, EventDataOption>
      >(undefined as unknown as ReportAdapter)
    ).toThrowError('Adapter is required');
  });

  it('test adapter hook', async () => {
    const reportAdapter = new ReportAdapter();

    const adapterBuilder = createAdapterBuilder<
      TrackContext<TrackData>,
      EventDataOption,
      AdapterOptions<TrackContext<TrackData>, EventDataOption>
    >(reportAdapter);

    const setupFun = vi.fn((ctx, eventType, eventData) => {
      return Promise.resolve({
        name: 'setup' as const,
        timeStamp: new Date().getTime(),
        newField: 'newField',
      });
    });
    const beforeFun = vi.fn((ctx) => {});
    const afterFun = vi.fn((ctx) => {});
    const transformFun = vi.fn((ctx, eventType, eventData) => {
      return {
        ...eventData,
        eventType,
      };
    });
    const reportFun = vi.fn((ctx, eventData, setupData) => {});
    vi.spyOn(reportAdapter, 'report').mockImplementation(reportFun);

    const adapter = adapterBuilder
      .setup(setupFun)
      .before(beforeFun)
      .transform('addCart', transformFun)
      .after(afterFun)
      .build();

    await adapter.track(
      {
        data: trackData,
      },
      'addCart',
      eventData.addCart
    );

    expect(setupFun.mock.lastCall).toBeDefined();
    expect(setupFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(setupFun.mock.lastCall?.[1]).toBe('addCart');
    expect(setupFun.mock.lastCall?.[2]).toMatchObject({ ...eventData.addCart });
    expect(setupFun.mock.results[0].value).toBeDefined();
    expect(setupFun.mock.results?.[0].value).toMatchObject(
      Promise.resolve({
        name: 'setup' as const,
        timeStamp: new Date().getTime(),
      })
    );

    expect(beforeFun.mock.lastCall).toBeDefined();
    expect(beforeFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(beforeFun.mock.results[0].value).toBeUndefined();

    expect(afterFun.mock.lastCall).toBeDefined();
    expect(afterFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(afterFun.mock.results[0].value).toBeUndefined();

    expect(transformFun.mock.lastCall).toBeDefined();
    expect(transformFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(transformFun.mock.lastCall?.[1]).toBe('addCart');
    expect(transformFun.mock.lastCall?.[2]).toMatchObject({
      ...eventData['addCart'],
    });
    expect(transformFun.mock.results[0].value).toMatchObject({
      ...eventData['addCart'],
      eventType: 'addCart',
    });

    expect(reportFun.mock.lastCall).toBeDefined();
    expect(reportFun.mock.lastCall?.[0]).toMatchObject({
      data: trackData,
    });
    expect(reportFun.mock.lastCall?.[1]).toMatchObject({
      ...eventData['addCart'],
      eventType: 'addCart',
    });

    expect(Object.keys(reportFun.mock.lastCall?.[2])).toMatchObject([
      'name',
      'timeStamp',
      'newField',
    ]);
    expect(reportFun.mock.results[0].value).toBeUndefined();
  });

  it('test adapter transform', async () => {
    const reportAdapter = new ReportAdapter();
    const trackBuilder = createAdapterBuilder<
      TrackContext<TrackData>,
      EventDataOption,
      AdapterOptions<TrackContext<TrackData>, EventDataOption>
    >(reportAdapter);

    const transformFun = vi.fn((ctx, eventType, eventData) => {
      return eventData;
    });

    const reportFun = vi.fn(
      (ctx: TrackContext<TrackData>, reportData: EventDataOption) => {}
    );

    vi.spyOn(reportAdapter, 'report').mockImplementation(reportFun);

    const adapter = trackBuilder.transform('addCart', transformFun).build();

    //eventType is addCart
    await adapter.track({ data: trackData }, 'addCart', eventData.addCart);

    const transformOptions = transformFun.mock.lastCall;

    expect(transformOptions).toBeDefined();
    expect(transformOptions?.[0]).toMatchObject({ data: trackData });
    expect(transformOptions?.[1]).toBe('addCart');
    expect(transformOptions?.[2]).toMatchObject({ ...eventData.addCart });

    const reportOptions = reportFun.mock.lastCall;
    expect(reportOptions).toBeDefined();
    expect(reportOptions?.[0]).toMatchObject({ data: trackData });
    expect(reportOptions?.[1]).toBeDefined();
    expect(reportOptions?.[1]).toMatchObject(eventData.addCart!);

    //eventType is registry
    await adapter.track({ data: trackData }, 'registry', eventData.registry);

    const reportOptions1 = reportFun.mock.lastCall;
    expect(reportOptions1).toBeDefined();
    expect(reportOptions1?.[1]).toBeDefined();
    expect(reportOptions1?.[1]).toMatchObject({
      ...eventData.registry,
    });

    //eventType is previewGoods
    await adapter.track(
      { data: trackData },
      'previewGoods',
      eventData.previewGoods
    );

    const reportOptions3 = reportFun.mock.lastCall;
    expect(reportOptions3).toBeDefined();
    expect(reportOptions?.[1]).toBeDefined();
    expect(reportOptions?.[1]).toMatchObject(eventData.previewGoods!);
  });
});
