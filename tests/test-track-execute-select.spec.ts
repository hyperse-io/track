import { defaultAdapter } from './fixtures/adapter/default-adapter.js';
import { defaultTack } from './fixtures/adapter/default-tack.js';
import { Context } from './fixtures/types/type-context.js';
import { InputOption } from './fixtures/types/type-input.js';

describe('test-track-execute-select.spec', () => {
  it('executeSelect names is empty', async () => {
    const track = defaultTack<Context, InputOption>();
    const adapter = await defaultAdapter<Context, InputOption>();

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
    const track = defaultTack<Context, InputOption>();
    const adapter = await defaultAdapter<Context, InputOption>();

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
    const track = defaultTack<Context, InputOption>();
    const adapter = await defaultAdapter<Context, InputOption>();

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
    const track = defaultTack<Context, InputOption>();
    const adapter = await defaultAdapter<Context, InputOption>();

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
    const track = defaultTack<Context, InputOption>();
    const adapter = await defaultAdapter<Context, InputOption>();

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
    const track = defaultTack<Context, InputOption>();
    const adapter = await defaultAdapter<Context, InputOption>();

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
    const track = defaultTack<Context, InputOption>();
    const adapter = await defaultAdapter<Context, InputOption>();

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
});
