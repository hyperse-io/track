import { Track } from '../src/index.js';
import { AnalyzerAdapter } from './fixtures/adapter/adapter-analyzer.js';
import { ConsoleAdapter } from './fixtures/adapter/adapter-console.js';
import { Context } from './fixtures/types/type-context.js';
import { InputOption } from './fixtures/types/type-input.js';

describe('test-track-instance.spec', () => {
  it('test Track instance', async () => {
    const consoleAdapter = new ConsoleAdapter();
    const analyzerAdapter = new AnalyzerAdapter();
    const ctxOptions: Context = {
      name: 'console adapter',
      env: 'prod',
      platform: 'web',
    };
    const inputOptions: InputOption = {
      message: 'this is a message',
    };
    const track = new Track<Context, InputOption>(ctxOptions);
    track
      .addAdapter(consoleAdapter)
      .addAdapter(analyzerAdapter)
      .before(() => {
        console.log('global before: ', new Date().getTime());
      })
      .after(() => {
        console.log('global after: ', new Date().getTime());
      })
      .select((ctx, adapterList) => {
        return adapterList;
      })
      .transform((ctx, options) => {
        return Promise.resolve({
          ...ctx,
          ...options,
          age: 1,
        });
      })
      .track(inputOptions);

    expect(true).toBe(true);
  });
});
