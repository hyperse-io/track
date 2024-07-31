import { createAdapterBuilder } from '../src/adapter/create-adapter-builder.js';
import { createTrackBuilder } from '../src/core/create-track-builder.js';
import { Context } from './fixtures/types/type-context.js';
import { InputOption } from './fixtures/types/type-input.js';

describe('test-track-pipeline.spec', () => {
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

  it('test simple Track', async () => {
    const adapterBuilder = await createAdapterBuilder<Context, InputOption>();

    const adapter = adapterBuilder
      .init((ctx) => {
        console.log('=> report adapter init: ');
      })
      .before((ctx) => {
        console.log('=> report adapter before: ');
      })
      .after((ctx) => {
        console.log('=> report adapter after: ');
      })
      .isTrackable(() => {
        return true;
      })
      .transform((ctx, eventType, eventData) => {
        console.log('=> report adapter transform: ');
        return {
          ...eventData,
          pay: {
            payId: 'p123',
            payName: 'Sample Pay',
            payType: 'credit',
          },
        };
      })
      .report((ctx, eventData) => {
        console.log('=> report adapter report: ');
      })
      .build();

    const trackBuilder = await createTrackBuilder<Context, InputOption>({
      createCtx() {
        return Promise.resolve(context);
      },
      globalInput: inputOptionData,
    });

    trackBuilder
      .before((ctx) => {
        console.log('=> track before: ');
      })
      .after(async (ctx) => {
        console.log('=> track after: ');
      })
      .transform((ctx, eventData) => {
        console.log('=> track transform: ');
        return eventData;
      })
      .useAdapter(() => {
        console.log('=> track addAdapter: ');
        return {
          report1: adapter,
          report2: adapter,
          report3: adapter,
          report4: adapter,
        };
      })
      .select()
      .track('previewGoods', inputOptionData);

    expect(true).toBeTruthy();
  });
});
