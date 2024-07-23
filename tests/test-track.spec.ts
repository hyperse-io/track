import { BaseAdapter, Track } from '../src/index.js';

class ConsoleAdapter extends BaseAdapter {
  transform<Context, V>(ctx: Context, options: V) {
    return {
      ...options,
      adapter: 'console',
      page: 'page',
    };
  }

  report(result: Awaited<ReturnType<typeof this.transform>>): void {
    console.log('ConsoleAdapter report: ', result);
  }

  isTrackable(): boolean {
    return true;
  }

  init<Context>(ctx: Context): void {}

  after<Context>(
    ctx: Context,
    result: Awaited<ReturnType<typeof this.transform>>
  ): void {
    console.log('ConsoleAdapter after: ', result);
  }

  before<Context, V>(ctx: Context, options: V): void {
    console.log('ConsoleAdapter before: ', options);
  }
}

describe('test-track.spec', () => {
  it('test Track instance', async () => {
    type Context = {
      env: 'prod' | 'uat';
    };
    const globalOptions: Context = {
      env: 'prod',
    };

    type Result = {
      page: string;
    };

    const options: Result = {
      page: 'page',
    };

    const consoleAdapter = new ConsoleAdapter();

    const track = new Track<Context, Result>(globalOptions);
    track
      .addAdapter(consoleAdapter)
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
      .track(options);

    expect(true).toBe(true);
  });
});
