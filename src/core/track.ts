import _ from 'lodash';
import { pipe } from '@hyperse/pipeline';
import { BaseAdapter } from '../adapter/adapter-base.js';
import {
  defaultGlobalTransform,
  defaultSelect,
} from '../constant/default-track-fns.js';
import { setAdd } from '../helpers/helper-set-add.js';
import {
  TrackFunctionVoid,
  TrackSelectFunction,
  TrackTransformFunction,
} from '../types/index.js';

export class Track<T, V> {
  private ctx: T;
  private adapterList: Array<BaseAdapter<T, V>>;
  private selectFun: TrackSelectFunction<T, Array<BaseAdapter<T, V>>>;
  private afterFns: Set<TrackFunctionVoid>;
  private beforeFns: Set<TrackFunctionVoid>;
  private globalTransform: TrackTransformFunction<T, V>;
  private globalOptions?: Partial<V>;

  constructor(ctx: T, globalOptions?: Partial<V>) {
    this.adapterList = [];
    this.afterFns = new Set<TrackFunctionVoid>();
    this.beforeFns = new Set<TrackFunctionVoid>();
    this.ctx = ctx;
    this.globalOptions = globalOptions;
  }

  /**
   * Adds one or more functions to be executed before the main track function.
   *
   * @param fns - The function(s) to be executed before the main track function.
   * @returns The current instance of the `Track` class.
   */
  before(fns: TrackFunctionVoid | TrackFunctionVoid[]) {
    setAdd<TrackFunctionVoid>(this.beforeFns, fns);
    return this;
  }

  /**
   * Adds one or more functions to be executed after the track event is triggered.
   *
   * @param fns - A single function or an array of functions to be executed.
   * @returns The current instance of the `Track` class.
   */
  after(fns: TrackFunctionVoid | TrackFunctionVoid[]) {
    setAdd<TrackFunctionVoid>(this.afterFns, fns);
    return this;
  }

  /**
   * Adds an adapter to the track.
   * @param adapter - The adapter to add. It can be a single `BaseAdapter` instance or an array of `BaseAdapter` instances.
   * @returns The updated `Track` instance.
   */
  addAdapter(adapter: BaseAdapter<T, V> | Array<BaseAdapter<T, V>>) {
    if (Array.isArray(adapter)) {
      for (const ad of adapter) {
        this.adapterList.push(ad);
      }
    } else {
      this.adapterList.push(adapter);
    }
    return this;
  }

  /**
   * Filter the list of adapters to be executed
   *
   * @param {TrackSelectFunction<T, Array<BaseAdapter<T, V>>>} fun - The select function to set.
   * @returns The updated `Track` instance.
   */
  select(fun: TrackSelectFunction<T, Array<BaseAdapter<T, V>>>) {
    this.selectFun = fun;
    return this;
  }

  /**
   * Sets the global transform function for the track.
   *
   * @param fun - The transform function to be set.
   * @returns The current instance of the track.
   */
  transform(fun: TrackTransformFunction<T, V>) {
    this.globalTransform = fun;
    return this;
  }

  /**
   * Executes the tracking process with the given options.
   * @param options - The options for the tracking process.
   * @returns A Promise that resolves when the tracking process is complete.
   */
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
      ({ adapterList, result }) =>
        this.executeAdapterListTrack(adapterList, result),
      () => this.executeAfterFns()
    )();
  }

  private async executeSelect(): Promise<{
    adapterList: Array<BaseAdapter<T, V>>;
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
    const result = await pipe(() => {
      const finalOptions = _.merge({}, options, this.globalOptions || {});
      return fun(this.ctx, finalOptions);
    })();
    return { result };
  }

  private async executeBeforeFns() {
    await Promise.all(Array.from(this.beforeFns).map((f) => f()));
  }

  private async executeAfterFns() {
    await Promise.all(Array.from(this.afterFns).map((f) => f()));
  }

  private async executeAdapterListTrack(
    adapterList: Array<BaseAdapter<T, V>>,
    result: V
  ) {
    for (const adapter of adapterList) {
      await this.executeAdapterTrack(adapter, result);
    }
  }

  private async executeAdapterTrack(adapter: BaseAdapter<T, V>, result: V) {
    return await pipe(() => adapter.track(this.ctx, result))();
  }
}
