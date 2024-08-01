import { createAdapterBuilder } from '../src/adapter/create-adapter-builder.js';
import { createTrackBuilder } from '../src/core/create-track-builder.js';
import { Context } from './fixtures/types/type-context.js';
import { EventDataOption } from './fixtures/types/type-event.js';

describe('test-track-pipeline.spec', () => {
  const context: Context = {
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
    timeStamp: undefined,
  };

  it('test track pipeline', async () => {
    const adapterBuilder = await createAdapterBuilder<
      Context,
      EventDataOption
    >();

    const adInitFun = vi.fn(async (ctx) => {});
    const adBeforeFun = vi.fn(async (ctx) => {});
    const adAfterFun = vi.fn(async (ctx) => {});
    const adIsTrackableFun = vi.fn(() => true);
    const adTransformFun = vi.fn((ctx, eventType, eventData) => {
      return {
        ...eventData,
        pay: {
          payId: 'p123',
          payName: 'Sample Pay',
          payType: 'credit',
        },
      };
    });
    const adReportFun = vi.fn((ctx, eventData) => {});

    const adapter = await adapterBuilder
      .init(adInitFun)
      .before(adBeforeFun)
      .after(adAfterFun)
      .isTrackable(adIsTrackableFun)
      .transform(adTransformFun)
      .report(adReportFun)
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
      reportAdapter: adapter,
      consoleAdapter: adapter,
    };

    type Name = keyof typeof adapterMap;
    const traUseAdapterFun = vi.fn(() => {
      return adapterMap;
    });
    const traSelectFun = vi.fn((ctx, adapterMap): Name | Name[] => [
      'consoleAdapter',
      'reportAdapter',
    ]);

    const trackBuilder = await createTrackBuilder<Context, EventDataOption>({
      createCtx() {
        return Promise.resolve(context);
      },
      eventData: eventData,
    });

    await trackBuilder
      .before(traBeforeFun)
      .after(traAfterFun)
      .transform(traTransformFun)
      .useAdapter(traUseAdapterFun)
      .select(traSelectFun)
      .track('previewGoods', eventData);

    expect(adInitFun.mock.lastCall).toBeDefined();
    expect(adInitFun.mock.lastCall?.[0]).toMatchObject(context);

    expect(adBeforeFun.mock.lastCall).toBeDefined();
    expect(adBeforeFun.mock.lastCall?.[0]).toMatchObject(context);

    expect(adIsTrackableFun.mock.lastCall).toBeDefined();
    expect(adIsTrackableFun.mock.results?.[0].value).toBeTruthy();

    expect(adTransformFun.mock.lastCall).toBeDefined();
    expect(adTransformFun.mock.lastCall?.[0]).toMatchObject(context);
    expect(adTransformFun.mock.lastCall?.[1]).toEqual('previewGoods');
    expect(adTransformFun.mock.lastCall?.[2]).toMatchObject({
      ...eventData,
      timeStamp: '2021-09-01T00:00:00Z',
    });
    expect(adTransformFun.mock.results[0].value).toMatchObject({
      ...eventData,
      pay: {
        payId: 'p123',
        payName: 'Sample Pay',
        payType: 'credit',
      },
      timeStamp: '2021-09-01T00:00:00Z',
    });

    expect(adReportFun.mock.lastCall).toBeDefined();
    expect(adReportFun.mock.lastCall?.[0]).toMatchObject(context);
    expect(adReportFun.mock.lastCall?.[1]).toMatchObject({
      ...eventData,
      pay: {
        payId: 'p123',
        payName: 'Sample Pay',
        payType: 'credit',
      },
      timeStamp: '2021-09-01T00:00:00Z',
    });

    expect(traBeforeFun.mock.lastCall).toBeDefined();
    expect(traBeforeFun.mock.lastCall?.[0]).toMatchObject(context);

    expect(traAfterFun.mock.lastCall).toBeDefined();
    expect(traAfterFun.mock.lastCall?.[0]).toMatchObject(context);

    expect(traTransformFun.mock.lastCall).toBeDefined();
    expect(traTransformFun.mock.lastCall?.[0]).toMatchObject(context);
    expect(traTransformFun.mock.lastCall?.[1]).toMatchObject(eventData);
    expect(traTransformFun.mock.results[0].value).toMatchObject({
      ...eventData,
      timeStamp: '2021-09-01T00:00:00Z',
    });

    expect(traUseAdapterFun.mock.results[0]).toBeDefined();
    expect(traUseAdapterFun.mock.results[0].value).toMatchObject(adapterMap);

    expect(traUseAdapterFun.mock.results[0]).toBeDefined();
    expect(traUseAdapterFun.mock.results[0].value).toMatchObject(adapterMap);

    expect(traSelectFun.mock.lastCall).toBeDefined();
    expect(traSelectFun.mock.lastCall?.[0]).toMatchObject(context);
    expect(traSelectFun.mock.lastCall?.[1]).toMatchObject(adapterMap);
    expect(traSelectFun.mock.results[0].value).toMatchObject([
      'consoleAdapter',
      'reportAdapter',
    ]);
  });
});
