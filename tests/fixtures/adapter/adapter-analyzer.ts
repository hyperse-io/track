import { BaseAdapter } from '../../../src/index.js';
import { Context } from '../types/type-context.js';
import { InputOption } from '../types/type-input.js';

export class AnalyzerAdapter extends BaseAdapter<Context, InputOption> {
  transform(ctx: Context, options: InputOption) {
    return {
      ...options,
      bundler: 'a.bundler.js',
      entry: ['index.tsx', 'main.tsx'],
    };
  }
  after(
    ctx: Context,
    result: Awaited<ReturnType<typeof this.transform>>
  ): void {
    console.log('AnalyzerAdapter after: ');
  }

  before(ctx: Context, options: InputOption): void {
    console.log('AnalyzerAdapter before: ');
  }

  init(ctx: Context): void {
    console.log('AnalyzerAdapter init');
  }

  report(result: Awaited<ReturnType<typeof this.transform>>): void {
    console.log('AnalyzerAdapter report: ', result);
  }

  isTrackable(): boolean {
    return true;
  }
}
