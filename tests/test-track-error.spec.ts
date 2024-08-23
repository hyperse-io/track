import { createTrackBuilder } from '../src/core/create-track-builder.js';
import { TrackAdapter } from '../src/types/types-adapter.js';
import { TrackContext } from '../src/types/types-create.js';
import { defaultAdapterBuilder } from './test-utils/adapter/default-adapter-builder.js';
import { ConsoleLogger } from './test-utils/console-logger.js';
import { AdapterOptions } from './test-utils/types/type-adapter-options.js';
import { EventDataOption } from './test-utils/types/type-event.js';
import { TrackData } from './test-utils/types/type-track-data.js';

describe('test-track-error.spec', () => {
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

  it('test throw error', async () => {
    let adapterBuilder = defaultAdapterBuilder();

    let adapter = adapterBuilder
      .setup(() => {
        throw new Error('setup Error');
      })
      .build();

    let error = await testAdapterError(adapter);

    expect(error.mock.results).toBeDefined();
    expect(error.mock.results[0].value).toEqual(
      'Exception: Error: setup Error'
    );

    adapterBuilder = defaultAdapterBuilder();
    adapter = adapterBuilder
      .before(() => {
        throw new Error('before Error');
      })
      .build();
    error = await testAdapterError(adapter);

    expect(error.mock.results).toBeDefined();
    expect(error.mock.results[0].value).toEqual(
      'Exception: Error: before Error'
    );

    adapterBuilder = defaultAdapterBuilder();
    adapter = adapterBuilder
      .transform('addCart', () => {
        throw new Error('transform Error');
      })
      .build();

    error = await testAdapterError(adapter);

    expect(error.mock.results).toBeDefined();
    expect(error.mock.results[0].value).toEqual(
      'Exception: Error: transform Error'
    );

    adapterBuilder = defaultAdapterBuilder();
    adapter = adapterBuilder
      .transform('previewGoods', (ctx, eventType, eventData) => {
        return eventData;
      })
      .after(() => {
        throw new Error('after Error');
      })
      .build();

    error = await testAdapterError(adapter);

    expect(error.mock.results).toBeDefined();
    expect(error.mock.results[0].value).toEqual(
      'Exception: Error: after Error'
    );
  });

  const testAdapterError = async (
    adapter: TrackAdapter<
      TrackContext<TrackData>,
      EventDataOption,
      AdapterOptions<TrackContext<TrackData>, EventDataOption>
    >
  ) => {
    const logger = new ConsoleLogger();
    const error = vi.fn((message: any, context?: string) => {
      return `Exception: ${message}`;
    });

    vi.spyOn(logger, 'error').mockImplementation(error);

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

    await trackBuilder
      .init(() => {
        return {
          report: adapter,
        };
      })
      .track('addCart', eventData.addCart);

    return error;
  };
});
