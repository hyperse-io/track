import { executeSelect } from '../src/helpers/helper-select-adapter.js';
import { createTrackBuilder } from '../src/index.js';
import { TrackContext } from '../src/types/types-create.js';
import { defaultAdapter } from './test-utils/adapter/default-adapter.js';
import { ConsoleLogger } from './test-utils/console-logger.js';
import { EventDataOption } from './test-utils/types/type-event.js';
import { TrackData } from './test-utils/types/type-track-data.js';

describe('test-track-execute-select.spec', () => {
  const ctx = {
    data: {
      env: 'prod',
      platform: 'android',
      ip: '0.0.0.0',
      userId: 'uuid_10001',
      bizMode: 'test',
    },
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

  it('executeSelect names is empty', async () => {
    const adapter = defaultAdapter();

    const adapterMap = {
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    };
    const lastAdapterMap = await executeSelect(ctx, adapterMap, undefined);

    expect(Object.keys(lastAdapterMap).length).toBe(5);
    expect(lastAdapterMap).toMatchObject({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    });
  });

  it('executeSelect names is string', async () => {
    const adapter = defaultAdapter();

    const adapterMap = {
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    };
    const lastAdapterMap = await executeSelect(
      ctx,
      adapterMap,
      'consoleAdapter'
    );

    expect(Object.keys(lastAdapterMap).length).toBe(1);
    expect(lastAdapterMap).toMatchObject({
      consoleAdapter: adapter,
    });
  });

  it('executeSelect names is string[]', async () => {
    const adapter = defaultAdapter();

    const adapterMap = {
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    };
    const lastAdapterMap = await executeSelect(ctx, adapterMap, [
      'consoleAdapter',
      'analyzerAdapter',
      'reportAdapter',
    ]);
    expect(Object.keys(lastAdapterMap).length).toBe(3);
    expect(lastAdapterMap).toMatchObject({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
    });
  });

  it('executeSelect names is () => string', async () => {
    const adapter = defaultAdapter();

    const adapterMap = {
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    };
    const lastAdapterMap = await executeSelect(
      ctx,
      adapterMap,
      () => 'consoleAdapter'
    );

    expect(Object.keys(lastAdapterMap).length).toBe(1);
    expect(lastAdapterMap).toMatchObject({
      consoleAdapter: adapter,
    });
  });

  it('executeSelect names is () => string[]', async () => {
    const adapter = defaultAdapter();

    const adapterMap = {
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    };
    const lastAdapterMap = await executeSelect(ctx, adapterMap, () => [
      'consoleAdapter',
      'analyzerAdapter',
      'reportAdapter',
    ]);

    expect(Object.keys(lastAdapterMap).length).toBe(3);
    expect(lastAdapterMap).toMatchObject({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
    });
  });

  it('executeSelect names is () => Promise<string>', async () => {
    const adapter = defaultAdapter();

    const adapterMap = {
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    };
    const lastAdapterMap = await executeSelect(ctx, adapterMap, () =>
      Promise.resolve('analyzerAdapter')
    );

    expect(Object.keys(lastAdapterMap).length).toBe(1);
    expect(lastAdapterMap).toMatchObject({
      analyzerAdapter: adapter,
    });
  });

  it('executeSelect names is () => Promise<string[]>', async () => {
    const adapter = defaultAdapter();

    const adapterMap = {
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    };
    const lastAdapterMap = await executeSelect(ctx, adapterMap, () =>
      Promise.resolve(['businessAdapter', 'analyzerAdapter', 'logAdapter'])
    );

    expect(Object.keys(lastAdapterMap).length).toBe(3);
    expect(lastAdapterMap).toMatchObject({
      businessAdapter: adapter,
      analyzerAdapter: adapter,
      logAdapter: adapter,
    });
  });

  it('executeSelect isTrackable', async () => {
    const logger = new ConsoleLogger();
    const print = vi.fn((message: any, context?: string) => {
      return message;
    });
    vi.spyOn(logger, 'warn').mockImplementation(print);

    const adapter1 = defaultAdapter();
    const adapter2 = defaultAdapter();
    const adapter3 = defaultAdapter();
    const adapter4 = defaultAdapter();
    const adapter5 = defaultAdapter();

    const trackBuilder = createTrackBuilder<
      TrackContext<TrackData>,
      EventDataOption
    >({
      logger: logger,
    });

    vi.spyOn(adapter1, 'isTrackable').mockReturnValue(true);
    vi.spyOn(adapter2, 'isTrackable').mockReturnValue(true);
    vi.spyOn(adapter3, 'isTrackable').mockReturnValue(true);
    vi.spyOn(adapter4, 'isTrackable').mockReturnValue(true);
    vi.spyOn(adapter5, 'isTrackable').mockReturnValue(true);

    let adapterMap = {
      consoleAdapter: adapter1,
      analyzerAdapter: adapter2,
      reportAdapter: adapter3,
      logAdapter: adapter4,
      businessAdapter: adapter5,
    };

    await trackBuilder.init(adapterMap).track('addCart', eventData.addCart);
    expect(print.mock.calls).toHaveLength(0);
    expect(print.mock.results).toHaveLength(0);

    vi.spyOn(adapter1, 'isTrackable').mockReturnValue(true);
    vi.spyOn(adapter2, 'isTrackable').mockReturnValue(false);
    vi.spyOn(adapter3, 'isTrackable').mockReturnValue(false);
    vi.spyOn(adapter4, 'isTrackable').mockReturnValue(false);
    vi.spyOn(adapter5, 'isTrackable').mockReturnValue(false);

    adapterMap = {
      consoleAdapter: adapter1,
      analyzerAdapter: adapter2,
      reportAdapter: adapter3,
      logAdapter: adapter4,
      businessAdapter: adapter5,
    };
    await trackBuilder.init(adapterMap).track('addCart', eventData.addCart);

    expect(print.mock.calls).toHaveLength(4);
    expect(print.mock.results).toHaveLength(4);
    expect(print.mock.results?.[0].value).toBe(
      'Adapter analyzerAdapter: is not trackable'
    );
    expect(print.mock.results?.[1].value).toBe(
      'Adapter reportAdapter: is not trackable'
    );
    expect(print.mock.results?.[2].value).toBe(
      'Adapter logAdapter: is not trackable'
    );
    expect(print.mock.results?.[3].value).toBe(
      'Adapter businessAdapter: is not trackable'
    );
  });
});
