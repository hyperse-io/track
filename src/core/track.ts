import { pipe } from '@hyperse/pipeline';
import { BaseAdapter } from '../adapter/adapter-base.js';
import {
  defaultGlobalTransform,
  defaultSelect,
} from '../constant/default-track-fns.js';
import { weakSetAdd } from '../helpers/helper-weak-set-add.js';
import {
  TrackFunctionVoid,
  TrackSelectFunction,
  TrackTransformFunction,
} from '../types/index.js';

export class Track<Context, V> {
  private ctx: Context;
  private adapterList: Array<BaseAdapter>;
  private selectFun: TrackSelectFunction<Context, Array<BaseAdapter>>;
  private afterFns: Set<TrackFunctionVoid>;
  private beforeFns: Set<TrackFunctionVoid>;
  private globalTransform: TrackTransformFunction<Context, V>;

  constructor(ctx: Context) {
    this.adapterList = [];
    this.afterFns = new Set<TrackFunctionVoid>();
    this.beforeFns = new Set<TrackFunctionVoid>();
    this.ctx = ctx;
  }

  getCtx(): Context {
    return this.ctx;
  }

  before(fns: TrackFunctionVoid | TrackFunctionVoid[]) {
    weakSetAdd<TrackFunctionVoid>(this.beforeFns, fns);
    return this;
  }

  after(fns: TrackFunctionVoid | TrackFunctionVoid[]) {
    weakSetAdd<TrackFunctionVoid>(this.afterFns, fns);
    return this;
  }

  addAdapter<T>(adapter: BaseAdapter) {
    this.adapterList.push(adapter);
    return this;
  }

  addAdapterList(adapterList: Array<BaseAdapter>) {
    for (const adapter of adapterList) {
      this.adapterList.push(adapter);
    }
    return this;
  }

  select(fun: TrackSelectFunction<Context, Array<BaseAdapter>>) {
    this.selectFun = fun;
    return this;
  }

  transform(fun: TrackTransformFunction<Context, V>) {
    this.globalTransform = fun;
    return this;
  }

  private async executeSelect(): Promise<{
    adapterList: Array<BaseAdapter>;
  }> {
    const fun = this.selectFun || defaultSelect;
    const adapterList = await pipe(
      () => {
        return this.adapterList.filter((adapter) => adapter.isTrackable());
      },
      (adapterList) => fun(this.ctx, adapterList)
    )();
    return {
      adapterList,
    };
  }

  private async executeTransform(options: V): Promise<{ result: V }> {
    const fun = this.globalTransform || defaultGlobalTransform;
    const result = await pipe(() => fun(this.ctx, options))();
    return { result };
  }

  private async executeBeforeFns() {
    await Promise.all(Array.from(this.beforeFns).map((f) => f()));
  }

  private async executeAfterFns() {
    await Promise.all(Array.from(this.afterFns).map((f) => f()));
  }

  private async executeAdapterList(adapterList: Array<BaseAdapter>, result: V) {
    for (const adapter of adapterList) {
      await this.executeAdapter(adapter, result);
    }
  }

  private async executeAdapter(adapter: BaseAdapter, result: V) {
    return await pipe(() => adapter.track(this.ctx, result))();
  }

  async track(options: V) {
    await pipe(
      () => this.executeBeforeFns(),
      async () => await this.executeSelect(),
      async ({ adapterList }) => {
        const { result } = await this.executeTransform(options);
        return {
          result,
          adapterList,
        };
      },
      ({ adapterList, result }) => this.executeAdapterList(adapterList, result),
      () => this.executeAfterFns()
    )(options);
  }
}
