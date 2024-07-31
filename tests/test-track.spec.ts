import { createTrackBuilder } from '../src/index.js';
import { defaultAdapter } from './fixtures/adapter/default-adapter.js';
import { Context } from './fixtures/types/type-context.js';
import { InputOption } from './fixtures/types/type-input.js';

describe('test-track.spec', () => {
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
  it('test track hook', async () => {
    const trackBuilder = await createTrackBuilder<Context, InputOption>({
      createCtx: () => context,
    });
    const adapter = await defaultAdapter<Context, InputOption>();

    const adapterMap = {
      reportAdapter: adapter,
      consoleAdapter: adapter,
    };

    type Name = keyof typeof adapterMap;

    const beforeFun = vi.fn((ctx) => {});
    const afterFun = vi.fn((ctx) => {});
    const transformFun = vi.fn((ctx, eventData) => {
      return {
        ...eventData,
        sign: 'sign',
        timeStamp: 'timeStamp',
      };
    });
    const useAdapterFun = vi.fn(() => {
      return adapterMap;
    });
    const selectFun = vi.fn(
      (ctx, adapterMap): Name | Name[] => 'reportAdapter'
    );

    await trackBuilder
      .before(beforeFun)
      .after(afterFun)
      .transform(transformFun)
      .useAdapter(useAdapterFun)
      .select(selectFun)
      .track('addCart', inputOptionData);

    expect(beforeFun.mock.lastCall).toBeDefined();
    expect(beforeFun.mock.lastCall?.[0]).toMatchObject(context);
    expect(beforeFun.mock.results[0].value).toBeUndefined();

    expect(afterFun.mock.lastCall).toBeDefined();
    expect(afterFun.mock.lastCall?.[0]).toMatchObject(context);
    expect(afterFun.mock.results[0].value).toBeUndefined();

    expect(transformFun.mock.lastCall).toBeDefined();
    expect(transformFun.mock.lastCall?.[0]).toMatchObject(context);
    expect(transformFun.mock.lastCall?.[1]).toMatchObject(inputOptionData);
    expect(transformFun.mock.results[0].value).toMatchObject({
      ...inputOptionData,
      sign: 'sign',
      timeStamp: 'timeStamp',
    });

    expect(useAdapterFun.mock.lastCall).toBeDefined();
    expect(useAdapterFun.mock.results[0].value).toMatchObject(adapterMap);

    expect(selectFun.mock.lastCall).toBeDefined();
    expect(selectFun.mock.lastCall?.[0]).toMatchObject(context);
    expect(selectFun.mock.lastCall?.[1]).toMatchObject(adapterMap);
    expect(selectFun.mock.results[0].value).toBe('reportAdapter');
  });
});
