import { createAdapterBuilder } from '../src/adapter/create-adapter-builder.js';
import { LogLevel } from '../src/constant/log-level.js';
import { createTrackBuilder } from '../src/core/create-track-builder.js';
import { FormatStrategy } from '../src/logger/format-strategy.js';
import { Context } from './fixtures/types/type-context.js';
import { EventDataOption } from './fixtures/types/type-event.js';

describe('test-track-error.spec', () => {
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

  it('test throw error1', async () => {
    const formatStrategy = new TestFormatStrategy();
    const print = vi.fn(
      (priority: LogLevel, context: string, message: string, trace?: any) => {
        if (priority === LogLevel.Error) {
          return `Exception: ${message}`;
        }
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
      .init(() => {})
      .isTrackable(() => {
        return true;
      })
      .transform((ctx, eventType, eventData) => {
        return eventData;
      })
      .build();

    await trackBuilder
      .before((ctx) => {})
      .after((ctx) => {})
      .transform((ctx, eventData) => {
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
    expect(print.mock.results[0].value).toEqual(
      'Exception: Adapter track error: Error: Adapter report function is not defined'
    );
  });

  it('test throw error2', async () => {
    const formatStrategy = new TestFormatStrategy();
    const print = vi.fn(
      (priority: LogLevel, context: string, message: string, trace?: any) => {
        if (priority === LogLevel.Error) {
          return `Exception: ${message}`;
        }
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

    const adapter2 = await adapterBuilder
      .init(() => {})
      .isTrackable(() => {
        return true;
      })
      .transform((ctx, eventType, eventData) => {
        throw Error('Adapter transform error');
      })
      .report(() => {})
      .build();

    await trackBuilder
      .before((ctx) => {})
      .after((ctx) => {})
      .transform((ctx, eventData) => {
        throw Error('Track transform error');
      })
      .useAdapter(() => {
        return {
          report1: adapter2,
        };
      })
      .select()
      .track('previewGoods', eventData);

    expect(print.mock.results).toBeDefined();
    expect(print.mock.results[0].value).toEqual(
      'Exception: Failed to track event: Error: Track transform error'
    );
  });
});
