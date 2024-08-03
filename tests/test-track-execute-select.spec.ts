import { defaultAdapter } from './fixtures/adapter/default-adapter.js';
import { defaultTackInstance } from './fixtures/adapter/default-tack-instance.js';
import { EventDataOption } from './fixtures/types/type-event.js';
import { TrackData } from './fixtures/types/type-track-data.js';

describe('test-track-execute-select.spec', () => {
  it('executeSelect names is empty', async () => {
    const track = defaultTackInstance<TrackData, EventDataOption>();
    const adapter = await defaultAdapter();

    track.useAdapter({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    });

    track.select();
    const lastAdapterMap = await track.executeSelect();

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
    const track = defaultTackInstance<TrackData, EventDataOption>();
    const adapter = await defaultAdapter();

    track.useAdapter({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    });
    track.select('consoleAdapter');

    const lastAdapterMap = await track.executeSelect();

    expect(Object.keys(lastAdapterMap).length).toBe(1);
    expect(lastAdapterMap).toMatchObject({
      consoleAdapter: adapter,
    });
  });

  it('executeSelect names is string[]', async () => {
    const track = defaultTackInstance<TrackData, EventDataOption>();
    const adapter = await defaultAdapter();

    track.useAdapter({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    });

    track.select(['consoleAdapter', 'analyzerAdapter', 'reportAdapter']);

    const lastAdapterMap = await track.executeSelect();
    expect(Object.keys(lastAdapterMap).length).toBe(3);
    expect(lastAdapterMap).toMatchObject({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
    });
  });

  it('executeSelect names is () => string', async () => {
    const track = defaultTackInstance<TrackData, EventDataOption>();
    const adapter = await defaultAdapter();

    track.useAdapter({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    });

    track.select(() => 'consoleAdapter');
    const lastAdapterMap = await track.executeSelect();

    expect(Object.keys(lastAdapterMap).length).toBe(1);
    expect(lastAdapterMap).toMatchObject({
      consoleAdapter: adapter,
    });
  });

  it('executeSelect names is () => string[]', async () => {
    const track = defaultTackInstance<TrackData, EventDataOption>();
    const adapter = await defaultAdapter();

    track.useAdapter({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    });

    track.select(() => ['consoleAdapter', 'analyzerAdapter', 'reportAdapter']);

    const lastAdapterMap = await track.executeSelect();

    expect(Object.keys(lastAdapterMap).length).toBe(3);
    expect(lastAdapterMap).toMatchObject({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
    });
  });

  it('executeSelect names is () => Promise<string>', async () => {
    const track = defaultTackInstance<TrackData, EventDataOption>();
    const adapter = await defaultAdapter();

    track.useAdapter({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    });

    track.select(() => Promise.resolve('analyzerAdapter'));

    const lastAdapterMap = await track.executeSelect();

    expect(Object.keys(lastAdapterMap).length).toBe(1);
    expect(lastAdapterMap).toMatchObject({
      analyzerAdapter: adapter,
    });
  });

  it('executeSelect names is () => Promise<string[]>', async () => {
    const track = defaultTackInstance<TrackData, EventDataOption>();
    const adapter = await defaultAdapter();

    track.useAdapter({
      consoleAdapter: adapter,
      analyzerAdapter: adapter,
      reportAdapter: adapter,
      logAdapter: adapter,
      businessAdapter: adapter,
    });

    track.select(() =>
      Promise.resolve(['analyzerAdapter', 'logAdapter', 'businessAdapter'])
    );
    const lastAdapterMap = await track.executeSelect();

    expect(Object.keys(lastAdapterMap).length).toBe(3);
    expect(lastAdapterMap).toMatchObject({
      businessAdapter: adapter,
      analyzerAdapter: adapter,
      logAdapter: adapter,
    });
  });

  it('executeSelect isTrackable', async () => {
    const track = defaultTackInstance<TrackData, EventDataOption>();
    const adapter1 = await defaultAdapter();
    const adapter2 = await defaultAdapter();
    const adapter3 = await defaultAdapter();
    const adapter4 = await defaultAdapter();
    const adapter5 = await defaultAdapter();

    adapter1._setTrackable(true);
    adapter2._setTrackable(true);
    adapter3._setTrackable(true);
    adapter4._setTrackable(true);
    adapter5._setTrackable(true);

    track.useAdapter({
      consoleAdapter: adapter1,
      analyzerAdapter: adapter2,
      reportAdapter: adapter3,
      logAdapter: adapter4,
      businessAdapter: adapter5,
    });

    let lastAdapterMap = await track.executeSelect();
    expect(Object.keys(lastAdapterMap).length).toBe(5);
    expect(lastAdapterMap).toMatchObject({
      consoleAdapter: adapter1,
      analyzerAdapter: adapter2,
      reportAdapter: adapter3,
      logAdapter: adapter4,
      businessAdapter: adapter5,
    });

    adapter1._setTrackable(true);
    adapter2._setTrackable(false);
    adapter3._setTrackable(false);
    adapter4._setTrackable(false);
    adapter5._setTrackable(false);

    track.useAdapter({
      consoleAdapter: adapter1,
      analyzerAdapter: adapter2,
      reportAdapter: adapter3,
      logAdapter: adapter4,
      businessAdapter: adapter5,
    });
    lastAdapterMap = await track.executeSelect();
    expect(Object.keys(lastAdapterMap).length).toBe(1);
    expect(lastAdapterMap).toMatchObject({
      consoleAdapter: adapter1,
    });

    adapter1._setTrackable(true);
    adapter2._setTrackable(true);
    adapter3._setTrackable(true);
    adapter4._setTrackable(false);
    adapter5._setTrackable(false);

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
    lastAdapterMap = await track.executeSelect();
    expect(Object.keys(lastAdapterMap).length).toBe(1);
    expect(lastAdapterMap).toMatchObject({
      reportAdapter: adapter3,
    });
  });
});
