import { createAdapterBuilder } from '../src/adapter/create-adapter-builder.js';
import { LogLevel } from '../src/constant/log-level.js';
import { createTrackBuilder } from '../src/core/create-track-builder.js';
import { logger } from '../src/logger/create-logger.js';
import { FormatStrategy } from '../src/logger/format-strategy.js';
import { Context } from './fixtures/types/type-context.js';
import { EventDataOption } from './fixtures/types/type-event.js';

describe('test-track-logger.spec', () => {
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
  };

  class TestFormatStrategy implements FormatStrategy<string> {
    print(
      priority: LogLevel,
      context: string,
      message: string,
      trace?: any
    ): void {
      console.log(priority, context, message, trace);
    }
  }

  it('test custom logger', async () => {
    const formatStrategy = new TestFormatStrategy();

    const print = vi.fn(
      (priority: LogLevel, context: string, message: string, trace?: any) => {
        return `TestFormatStrategy ${priority} ${context} ${message}`;
      }
    );
    vi.spyOn(formatStrategy, 'print').mockImplementation(print);

    const adapterBuilder = await createAdapterBuilder<
      Context,
      EventDataOption
    >();

    const trackBuilder = await createTrackBuilder<Context, EventDataOption>({
      createCtx() {
        return Promise.resolve(context);
      },
      eventData: eventData,
      formatStrategy: formatStrategy,
    });

    const adapter = await adapterBuilder
      .init(() => {
        logger.info('adapter init');
      })
      .before((ctx) => {
        logger.info('adapter before');
      })
      .after((ctx) => {
        logger.info('adapter after');
      })
      .isTrackable(() => {
        return true;
      })
      .transform((ctx, eventType, eventData) => {
        return eventData;
      })
      .report((ctx, eventData) => {})
      .build();

    await trackBuilder
      .before((ctx) => {
        logger.info('track before');
      })
      .after((ctx) => {
        logger.info('track after');
      })
      .transform((ctx, eventData) => {
        logger.info('track transform');
        return eventData;
      })
      .useAdapter(() => {
        return {
          report1: adapter,
        };
      })
      .select()
      .track('previewGoods', eventData);

    expect(print.mock.results).toBeDefined();
    expect(print.mock.results.length).toBe(6);
    expect(print.mock.results).toMatchObject([
      {
        type: 'return',
        value: 'TestFormatStrategy 2 @hyperse/track track before',
      },
      {
        type: 'return',
        value: 'TestFormatStrategy 2 @hyperse/track track transform',
      },
      {
        type: 'return',
        value: 'TestFormatStrategy 2 @hyperse/track adapter init',
      },
      {
        type: 'return',
        value: 'TestFormatStrategy 2 @hyperse/track adapter before',
      },
      {
        type: 'return',
        value: 'TestFormatStrategy 2 @hyperse/track adapter after',
      },
      {
        type: 'return',
        value: 'TestFormatStrategy 2 @hyperse/track track after',
      },
    ]);
  });
});
