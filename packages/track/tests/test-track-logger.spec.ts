import { createAdapterBuilder } from '../src/adapter/create-adapter-builder.js';
import { createTrackBuilder } from '../src/core/create-track-builder.js';
import { DEFAULT_CONTEXT } from '../src/index.js';
import type {
  TrackAdapterOptions,
  TrackContext,
} from '../src/types/types-create.js';
import { ReportAdapter } from './test-utils/adapter/report-adapter.js';
import { ConsoleLogger } from './test-utils/console-logger.js';
import type { EventDataOption } from './test-utils/types/type-event.js';
import type { TrackData } from './test-utils/types/type-track-data.js';

describe('test-track-logger.spec', () => {
  const trackData: TrackData = {
    env: 'prod',
    platform: 'android',
    ip: '0.0.0.0',
    userId: 'uuid_10001',
    bizMode: 'test',
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

  it('test custom logger', async () => {
    const logger = new ConsoleLogger();

    const print = vi.fn((message: any, context?: string) => {
      return `ConsoleLogger ${context || DEFAULT_CONTEXT} ${message}`;
    });
    vi.spyOn(logger, 'debug').mockImplementation(print);
    vi.spyOn(logger, 'error').mockImplementation(print);
    vi.spyOn(logger, 'info').mockImplementation(print);
    vi.spyOn(logger, 'verbose').mockImplementation(print);
    vi.spyOn(logger, 'warn').mockImplementation(print);

    const adapter = new ReportAdapter();

    const adapterBuilder = createAdapterBuilder<
      TrackContext<TrackData>,
      EventDataOption,
      TrackAdapterOptions<TrackContext<TrackData>, EventDataOption>
    >(adapter);

    const trackBuilder = createTrackBuilder<
      TrackContext<TrackData>,
      EventDataOption
    >({
      createData() {
        return Promise.resolve(trackData);
      },
      eventData: eventData,
      logger: logger,
    });

    adapterBuilder
      .setup(() => {
        logger.debug('adapter setup');
      })
      .before((ctx) => {
        logger.error('adapter before');
      })
      .transform('addCart', (ctx, eventType, eventData) => {
        logger.verbose('adapter transform');
        return eventData;
      })
      .after((ctx, eventType, eventData) => {
        logger.warn('adapter after');
      })
      .build();

    await trackBuilder
      .init(() => {
        logger.info('track useAdapter');
        return {
          reportData: adapter,
        };
      })
      .before((ctx) => {
        logger.info('track before');
      })
      .after((ctx) => {
        logger.info('track after');
      })
      .select(() => {
        logger.info('track select');
        return ['reportData'];
      })
      .track('addCart', eventData.addCart);

    expect(print.mock.results).toBeDefined();
    expect(print.mock.results.length).toBe(8);
    expect(print.mock.results).toMatchObject([
      {
        type: 'return',
        value: 'ConsoleLogger @hyperse/track track useAdapter',
      },
      {
        type: 'return',
        value: 'ConsoleLogger @hyperse/track track before',
      },
      {
        type: 'return',
        value: 'ConsoleLogger @hyperse/track track select',
      },
      {
        type: 'return',
        value: 'ConsoleLogger @hyperse/track adapter before',
      },
      {
        type: 'return',
        value: 'ConsoleLogger @hyperse/track adapter transform',
      },
      {
        type: 'return',
        value: 'ConsoleLogger @hyperse/track adapter setup',
      },
      {
        type: 'return',
        value: 'ConsoleLogger @hyperse/track adapter after',
      },
      { type: 'return', value: 'ConsoleLogger @hyperse/track track after' },
    ]);
  });
});
