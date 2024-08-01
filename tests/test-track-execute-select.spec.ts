import { defaultAdapter } from './fixtures/adapter/default-adapter.js';
import { defaultTack } from './fixtures/adapter/default-tack.js';
import { Context } from './fixtures/types/type-context.js';
import { EventDataOption } from './fixtures/types/type-event.js';

describe('test-track-execute-select.spec', () => {
  it('executeSelect names is empty', async () => {
    const track = defaultTack<Context, EventDataOption>();
    const adapter = await defaultAdapter<Context, EventDataOption>();

    track.useAdapter({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    });

    let adapterMap = track.getAdapterMap();

    expect(Object.keys(adapterMap).length).toBe(5);

    track.select();
    await track.executeSelect();

    adapterMap = track.getAdapterMap();
    expect(Object.keys(adapterMap).length).toBe(5);
    expect(adapterMap).toMatchObject({
      consoleAdapter: adapter,
    });
  });

  it('executeSelect names is string', async () => {
    const track = defaultTack<Context, EventDataOption>();
    const adapter = await defaultAdapter<Context, EventDataOption>();

    track.useAdapter({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    });
    let adapterMap = track.getAdapterMap();

    expect(Object.keys(adapterMap).length).toBe(5);

    track.select('consoleAdapter');

    await track.executeSelect();

    adapterMap = track.getAdapterMap();
    expect(Object.keys(adapterMap).length).toBe(1);
    expect(adapterMap).toMatchObject({
      consoleAdapter: adapter,
    });
  });

  it('executeSelect names is string[]', async () => {
    const track = defaultTack<Context, EventDataOption>();
    const adapter = await defaultAdapter<Context, EventDataOption>();

    track.useAdapter({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    });
    let adapterMap = track.getAdapterMap();
    expect(Object.keys(adapterMap).length).toBe(5);

    track.select(['consoleAdapter', 'analyzerAdapter', 'reportAdapter']);
    await track.executeSelect();

    adapterMap = track.getAdapterMap();
    expect(Object.keys(adapterMap).length).toBe(3);
    expect(adapterMap).toMatchObject({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
    });
  });

  it('executeSelect names is () => string', async () => {
    const track = defaultTack<Context, EventDataOption>();
    const adapter = await defaultAdapter<Context, EventDataOption>();

    track.useAdapter({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    });
    let adapterMap = track.getAdapterMap();
    expect(Object.keys(adapterMap).length).toBe(5);

    track.select(() => 'consoleAdapter');
    await track.executeSelect();

    adapterMap = track.getAdapterMap();

    expect(Object.keys(adapterMap).length).toBe(1);
    expect(adapterMap).toMatchObject({
      consoleAdapter: adapter,
    });
  });

  it('executeSelect names is () => string[]', async () => {
    const track = defaultTack<Context, EventDataOption>();
    const adapter = await defaultAdapter<Context, EventDataOption>();

    track.useAdapter({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    });
    let adapterMap = track.getAdapterMap();
    expect(Object.keys(adapterMap).length).toBe(5);

    track.select(() => ['consoleAdapter', 'analyzerAdapter', 'reportAdapter']);
    await track.executeSelect();

    adapterMap = track.getAdapterMap();

    expect(Object.keys(adapterMap).length).toBe(3);
    expect(adapterMap).toMatchObject({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
    });
  });

  it('executeSelect names is () => Promise<string>', async () => {
    const track = defaultTack<Context, EventDataOption>();
    const adapter = await defaultAdapter<Context, EventDataOption>();

    track.useAdapter({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    });
    let adapterMap = track.getAdapterMap();
    expect(Object.keys(adapterMap).length).toBe(5);

    track.select(() => Promise.resolve('analyzerAdapter'));
    await track.executeSelect();

    adapterMap = track.getAdapterMap();

    expect(Object.keys(adapterMap).length).toBe(1);
    expect(adapterMap).toMatchObject({
      analyzerAdapter: adapter,
    });
  });

  it('executeSelect names is () => Promise<string[]>', async () => {
    const track = defaultTack<Context, EventDataOption>();
    const adapter = await defaultAdapter<Context, EventDataOption>();

    track.useAdapter({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    });
    let adapterMap = track.getAdapterMap();
    expect(Object.keys(adapterMap).length).toBe(5);

    track.select(() =>
      Promise.resolve(['analyzerAdapter', 'logAdapter', 'businessAdapter'])
    );
    await track.executeSelect();

    adapterMap = track.getAdapterMap();

    expect(Object.keys(adapterMap).length).toBe(3);
    expect(adapterMap).toMatchObject({
      businessAdapter: adapter,
      analyzerAdapter: adapter,
      logAdapter: adapter,
    });
  });

  it('executeSelect isTrackable', async () => {
    const track = defaultTack<Context, EventDataOption>();
    const adapter1 = await defaultAdapter<Context, EventDataOption>();
    const adapter2 = await defaultAdapter<Context, EventDataOption>();
    const adapter3 = await defaultAdapter<Context, EventDataOption>();
    const adapter4 = await defaultAdapter<Context, EventDataOption>();
    const adapter5 = await defaultAdapter<Context, EventDataOption>();

    adapter1.setTrackable(true);
    adapter2.setTrackable(true);
    adapter3.setTrackable(true);
    adapter4.setTrackable(true);
    adapter5.setTrackable(true);

    track.useAdapter({
      consoleAdapter: adapter1,
      analyzerAdapter: adapter2,
      reportAdapter: adapter3,
      logAdapter: adapter4,
      businessAdapter: adapter5,
    });
    let adapterMap = track.getAdapterMap();
    expect(Object.keys(adapterMap).length).toBe(5);

    await track.executeSelect();
    adapterMap = track.getAdapterMap();
    expect(Object.keys(adapterMap).length).toBe(5);
    expect(adapterMap).toMatchObject({
      consoleAdapter: adapter1,
      analyzerAdapter: adapter2,
      reportAdapter: adapter3,
      logAdapter: adapter4,
      businessAdapter: adapter5,
    });

    adapter1.setTrackable(true);
    adapter2.setTrackable(false);
    adapter3.setTrackable(false);
    adapter4.setTrackable(false);
    adapter5.setTrackable(false);

    track.useAdapter({
      consoleAdapter: adapter1,
      analyzerAdapter: adapter2,
      reportAdapter: adapter3,
      logAdapter: adapter4,
      businessAdapter: adapter5,
    });
    await track.executeSelect();
    adapterMap = track.getAdapterMap();
    expect(Object.keys(adapterMap).length).toBe(1);
    expect(adapterMap).toMatchObject({
      consoleAdapter: adapter1,
    });

    adapter1.setTrackable(true);
    adapter2.setTrackable(true);
    adapter3.setTrackable(true);
    adapter4.setTrackable(false);
    adapter5.setTrackable(false);

    track.useAdapter({
      consoleAdapter: adapter1,
      analyzerAdapter: adapter2,
      reportAdapter: adapter3,
      logAdapter: adapter4,
      businessAdapter: adapter5,
    });
    track.select(() => {
      return Promise.resolve(['reportAdapter']);
    });
    await track.executeSelect();
    adapterMap = track.getAdapterMap();
    expect(Object.keys(adapterMap).length).toBe(1);
    expect(adapterMap).toMatchObject({
      reportAdapter: adapter3,
    });
  });
});
