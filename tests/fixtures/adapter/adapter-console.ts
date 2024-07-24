import { BaseAdapter } from '../../../src/index.js';
import { Context } from '../types/type-context.js';
import { InputOption } from '../types/type-input.js';

export class ConsoleAdapter extends BaseAdapter<Context, InputOption> {
  transform(ctx: Context, options: InputOption) {
    return {
      ...options,
      adapter: 'console',
      page: 'page',
      url: 'http://localhost:3000',
      params: {
        value1: '123',
        value2: '456',
      },
    };
  }
  after(
    ctx: Context,
    result: Awaited<ReturnType<typeof this.transform>>
  ): void {
    console.log('ConsoleAdapter after: ');
  }

  before(ctx: Context, options: InputOption): void {
    console.log('ConsoleAdapter before: ');
  }

  init(ctx: Context): void {
    console.log('ConsoleAdapter init');
  }

  report(result: Awaited<ReturnType<typeof this.transform>>): void {
    console.log('ConsoleAdapter report: ', result);
  }

  isTrackable(): boolean {
    return true;
  }
}
