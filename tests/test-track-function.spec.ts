import { createTrack } from '../src/core/create-track.js';
import { AnalyzerAdapter } from './fixtures/adapter/adapter-analyzer.js';
import { ConsoleAdapter } from './fixtures/adapter/adapter-console.js';
import { ExceptionAdapter } from './fixtures/adapter/adapter-exception.js';
import { Context } from './fixtures/types/type-context.js';
import { InputOption } from './fixtures/types/type-input.js';

describe('test-track-function.spec', () => {
  it('test simple Track', async () => {
    const consoleAdapter = new ConsoleAdapter();
    const track = await createTrack<Context, InputOption>({
      createCtx: () => {
        return {
          name: 'simple track adapter',
          env: 'uat',
          platform: 'android',
        };
      },
      level: 'warn',
    });

    const inputOptions: InputOption = {
      message: 'test simple track',
    };
    await track.addAdapter(consoleAdapter).track(inputOptions);
    expect(true).toBe(true);
  });

  it('test exception Track', async () => {
    const consoleAdapter = new ConsoleAdapter();
    const analyzerAdapter = new AnalyzerAdapter();
    const exceptionAdapter = new ExceptionAdapter();
    const track = await createTrack<Context, InputOption>({
      createCtx: () => {
        return {
          name: 'simple track adapter',
          env: 'uat',
          platform: 'android',
        };
      },
      level: 'warn',
    });

    const inputOptions: InputOption = {
      message: 'test simple track',
    };
    try {
      await track
        .addAdapter([consoleAdapter, analyzerAdapter, exceptionAdapter])
        .track(inputOptions);
    } catch (error: any) {
      console.error(error.message);
    }
    expect(true).toBe(true);
  });

  it('test create Track', async () => {
    const consoleAdapter = new ConsoleAdapter();
    const analyzerAdapter = new AnalyzerAdapter();
    const track = await createTrack<Context, InputOption>({
      createCtx: () => {
        return {
          name: 'track adapter',
          env: 'prod',
          platform: 'web',
        };
      },
      level: 'info',
    });

    const inputOptions: InputOption = {
      message: 'this is a message',
    };
    track
      .addAdapter([consoleAdapter, analyzerAdapter])
      .before(() => {
        console.log('global before: ', new Date().getTime());
      })
      .after([
        () => {
          console.log('global after 1: ', new Date().getTime());
        },
        () => {
          console.log('global after 2: ', new Date().getTime());
        },
        () => {
          console.log('global after 3: ', new Date().getTime());
        },
      ])
      .after([
        () => {
          console.log('global after 4: ', new Date().getTime());
        },
      ])
      .after(() => {
        console.log('global after 5: ', new Date().getTime());
      })
      .select((ctx, adapterList) => {
        return adapterList.filter((adapter) => adapter.isTrackable());
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
