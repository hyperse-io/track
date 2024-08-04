import { executeSelect } from '../src/helpers/helper-select-adapter.js';
import { defaultAdapter } from './fixtures/adapter/default-adapter.js';
import { defaultTackInstance } from './fixtures/adapter/default-tack-instance.js';

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

  it('executeSelect names is empty', async () => {
    const adapter = await defaultAdapter();

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
    const adapter = await defaultAdapter();

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
    const adapter = await defaultAdapter();

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
    const adapter = await defaultAdapter();

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
    const adapter = await defaultAdapter();

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
    const adapter = await defaultAdapter();

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
    const adapter = await defaultAdapter();

    const adapterMap = {
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    };
    const lastAdapterMap = await executeSelect(ctx, adapterMap, () =>
      Promise.resolve(['analyzerAdapter', 'logAdapter', 'businessAdapter'])
    );

    expect(Object.keys(lastAdapterMap).length).toBe(3);
    expect(lastAdapterMap).toMatchObject({
      businessAdapter: adapter,
      analyzerAdapter: adapter,
      logAdapter: adapter,
    });
  });

  it('executeSelect isTrackable', async () => {
    const adapter1 = await defaultAdapter();
    const adapter2 = await defaultAdapter();
    const adapter3 = await defaultAdapter();
    const adapter4 = await defaultAdapter();
    const adapter5 = await defaultAdapter();

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
    let lastAdapterMap = await executeSelect(ctx, adapterMap, undefined);

    expect(Object.keys(lastAdapterMap).length).toBe(5);
    expect(lastAdapterMap).toMatchObject({
      consoleAdapter: adapter1,
      analyzerAdapter: adapter2,
      reportAdapter: adapter3,
      logAdapter: adapter4,
      businessAdapter: adapter5,
    });

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
    lastAdapterMap = await executeSelect(ctx, adapterMap, undefined);
    expect(Object.keys(lastAdapterMap).length).toBe(1);
    expect(lastAdapterMap).toMatchObject({
      consoleAdapter: adapter1,
    });

    vi.spyOn(adapter1, 'isTrackable').mockReturnValue(true);
    vi.spyOn(adapter2, 'isTrackable').mockReturnValue(true);
    vi.spyOn(adapter3, 'isTrackable').mockReturnValue(true);
    vi.spyOn(adapter4, 'isTrackable').mockReturnValue(false);
    vi.spyOn(adapter5, 'isTrackable').mockReturnValue(false);

    adapterMap = {
      consoleAdapter: adapter1,
      analyzerAdapter: adapter2,
      reportAdapter: adapter3,
      logAdapter: adapter4,
      businessAdapter: adapter5,
    };
    lastAdapterMap = await executeSelect(ctx, adapterMap, () => {
      return Promise.resolve(['reportAdapter']);
    });
    expect(Object.keys(lastAdapterMap).length).toBe(1);
    expect(lastAdapterMap).toMatchObject({
      reportAdapter: adapter3,
    });
  });
});
