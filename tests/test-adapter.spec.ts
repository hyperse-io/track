import { createAdapterBuilder } from '../src/adapter/create-adapter-builder.js';
import { Context } from './fixtures/types/type-context.js';
import { InputOption } from './fixtures/types/type-input.js';

describe('test-adapter.spec', () => {
  const context: Context = {
    env: 'prod',
    platform: 'android',
    ip: '0.0.0.0',
    userId: 'uuid_10001',
  };

  const inputOptionData: InputOption = {
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

  it('test adapter hook', async () => {
    const trackBuilder = await createAdapterBuilder<Context, InputOption>();

    const initFun = vi.fn((ctx) => {});
    const beforeFun = vi.fn((ctx) => {});
    const afterFun = vi.fn((ctx) => {});
    const isTrackableFun = vi.fn(() => true);
    const transformFun = vi.fn((ctx, eventType, eventData) => {
      return {
        ...eventData[eventType],
        eventType,
      };
    });
    const reportFun = vi.fn((ctx, eventData) => {});

    const adapter = trackBuilder
      .init(initFun)
      .before(beforeFun)
      .after(afterFun)
      .isTrackable(isTrackableFun)
      .transform(transformFun)
      .report(reportFun)
      .build();

    await adapter.track(context, 'addCart', inputOptionData);

    expect(initFun.mock.lastCall).toBeDefined();
    expect(initFun.mock.lastCall?.[0]).toMatchObject(context);
    expect(initFun.mock.results[0].value).toBeUndefined();

    expect(beforeFun.mock.lastCall).toBeDefined();
    expect(beforeFun.mock.lastCall?.[0]).toMatchObject(context);
    expect(beforeFun.mock.results[0].value).toBeUndefined();

    expect(afterFun.mock.lastCall).toBeDefined();
    expect(afterFun.mock.lastCall?.[0]).toMatchObject(context);
    expect(afterFun.mock.results[0].value).toBeUndefined();

    expect(isTrackableFun.mock.lastCall).toBeDefined();
    expect(isTrackableFun.mock.lastCall?.length).toBe(0);
    expect(isTrackableFun.mock.results[0].value).toBeTruthy();

    expect(transformFun.mock.lastCall).toBeDefined();
    expect(transformFun.mock.lastCall?.[0]).toMatchObject(context);
    expect(transformFun.mock.lastCall?.[1]).toBe('addCart');
    expect(transformFun.mock.lastCall?.[2]).toMatchObject(inputOptionData);
    expect(transformFun.mock.results[0].value).toMatchObject({
      ...inputOptionData['addCart'],
      eventType: 'addCart',
    });

    expect(reportFun.mock.lastCall).toBeDefined();
    expect(reportFun.mock.lastCall?.[0]).toMatchObject(context);
    expect(reportFun.mock.lastCall?.[1]).toMatchObject({
      ...inputOptionData['addCart'],
      eventType: 'addCart',
    });
    expect(reportFun.mock.results[0].value).toBeUndefined();
  });

  it('test adapter transform', async () => {
    const trackBuilder = await createAdapterBuilder<Context, InputOption>();

    const transformFun = vi.fn((ctx, eventType, eventData) => {
      return {
        ...eventData[eventType],
        eventType,
      };
    });

    const reportFun = vi.fn((ctx: any, eventData: any) => {});

    const adapter = trackBuilder
      .init((ctx) => {})
      .transform(transformFun)
      .report(reportFun)
      .build();

    //eventType is addCart
    await adapter.track(context, 'addCart', inputOptionData);

    const transformOptions = transformFun.mock.lastCall;
    expect(transformOptions).toBeDefined();
    expect(transformOptions?.[0]).toMatchObject(context);
    expect(transformOptions?.[1]).toEqual('addCart');
    expect(transformOptions?.[2]).toMatchObject(inputOptionData);

    const reportOptions = reportFun.mock.lastCall;
    expect(reportOptions).toBeDefined();
    expect(reportOptions?.[0]).toMatchObject(context);
    expect(reportOptions?.[1]).toMatchObject(inputOptionData['addCart']);
    expect(reportOptions?.[1]?.['eventType']).toEqual('addCart');

    //eventType is registry
    await adapter.track(context, 'registry', inputOptionData);

    const transformOptions1 = transformFun.mock.lastCall;
    expect(transformOptions1).toBeDefined();
    expect(transformOptions1?.[0]).toMatchObject(context);
    expect(transformOptions1?.[1]).toEqual('registry');
    expect(transformOptions1?.[2]).toMatchObject(inputOptionData);

    const reportOptions1 = reportFun.mock.lastCall;
    expect(reportOptions1).toBeDefined();
    expect(reportOptions1?.[1]).toMatchObject(inputOptionData['registry']);
    expect(reportOptions1?.[1]?.['eventType']).toEqual('registry');

    //eventType is previewGoods
    await adapter.track(context, 'previewGoods', inputOptionData);

    const transformOptions2 = transformFun.mock.lastCall;
    expect(transformOptions2).toBeDefined();
    expect(transformOptions2?.[0]).toMatchObject(context);
    expect(transformOptions2?.[1]).toEqual('previewGoods');
    expect(transformOptions2?.[2]).toMatchObject(inputOptionData);

    const reportOptions3 = reportFun.mock.lastCall;
    expect(reportOptions3).toBeDefined();
    expect(reportOptions3?.[1]).toMatchObject(inputOptionData['previewGoods']);
    expect(reportOptions3?.[1]?.['eventType']).toEqual('previewGoods');
  });
});
