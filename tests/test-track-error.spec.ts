import { createTrackBuilder } from '../src/core/create-track-builder.js';
import { TrackAdapter } from '../src/types/types-adapter.js';
import { TrackContext } from '../src/types/types-create.js';
import { defaultAdapterBuilder } from './fixtures/adapter/default-adapter-builder.js';
import { ConsoleLogger } from './fixtures/console-logger.js';
import { AdapterOptions } from './fixtures/types/type-adapter-options.js';
import { EventDataOption } from './fixtures/types/type-event.js';
import { TrackData } from './fixtures/types/type-track-data.js';

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
    let adapterBuilder = await defaultAdapterBuilder();

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

    adapterBuilder = await defaultAdapterBuilder();
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

    adapterBuilder = await defaultAdapterBuilder();
    adapter = adapterBuilder
      .transform(() => {
        throw new Error('transform Error');
      })
      .build();

    error = await testAdapterError(adapter);

    expect(error.mock.results).toBeDefined();
    expect(error.mock.results[0].value).toEqual(
      'Exception: Error: transform Error'
    );

    adapterBuilder = await defaultAdapterBuilder();
    adapter = adapterBuilder
      .transform(() => {})
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

    const trackBuilder = await createTrackBuilder<
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
      .useAdapter(() => {
        return {
          report: adapter,
        };
      })
      .track('previewGoods', eventData);

    return error;
  };
});
