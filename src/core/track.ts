import { pipe } from '@hyperse/pipeline';
import { weakSetAdd } from '../helpers/helper-weak-set-add.js';
import {
  TrackAdapter,
  TrackContext,
  TrackContextFunction,
  TrackFunctionVoid,
  TrackTransformFunction,
} from '../types/index.js';

export class Track<Context extends TrackContext, V extends object> {
  private ctx: Context;
  private adapterList: Array<TrackAdapter>;
  private ctxFun: TrackContextFunction<Context>;
  private selectFun: TrackContextFunction<Context>;
  private afterFns: WeakSet<TrackFunctionVoid<Context>>;
  private beforeFns: WeakSet<TrackFunctionVoid<Context>>;
  private globalTransform: TrackTransformFunction<Context, V>;

  constructor(ctx: Context) {
    this.ctx = ctx;
    this.adapterList = [];
    this.afterFns = new WeakSet<TrackFunctionVoid<Context>>();
    this.beforeFns = new WeakSet<TrackFunctionVoid<Context>>();
  }

  createCtx(fun: TrackContextFunction<Context>) {
    this.ctxFun = fun;
    return this;
  }

  before(fns: TrackFunctionVoid<Context> | TrackFunctionVoid<Context>[]) {
    weakSetAdd<TrackFunctionVoid<Context>>(this.beforeFns, fns);
    return this;
  }

  after(fns: TrackFunctionVoid<Context> | TrackFunctionVoid<Context>[]) {
    weakSetAdd<TrackFunctionVoid<Context>>(this.afterFns, fns);
    return this;
  }

  addAdapter(adapter: TrackAdapter) {
    this.adapterList.push(adapter);
    return this;
  }

  select() {
    return this;
  }

  transform(fun: TrackTransformFunction<Context, V>) {
    this.globalTransform = fun;
    return this;
  }

  async track(options: V) {
    try {
      await pipe(
        () => this.ctxFun(this.ctx),
        () => this.selectFun(this.ctx),
        (ctx) => this.globalTransform(ctx, options),
        (options) => {
          //execute adapter
        }
      )();
    } catch (error) {}
  }
}
