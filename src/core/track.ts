import { pipe } from '@hyperse/pipeline';
import { defaultTrackTransform } from '../constant/track-func.js';
import { ensureArray } from '../helpers/helper-array.js';
import { deepMerge } from '../helpers/helper-deep-merge.js';
import { ensureFuncExist } from '../helpers/helper-ensure-func-exist.js';
import { isFunction } from '../helpers/helper-is-function.js';
import { logger } from '../logger/create-logger.js';
import {
  TrackAdapterMap,
  TrackEventDataBase,
  TrackSelectOptions,
  TrackTransformFunction,
} from '../types/index.js';
import { TrackAdapter } from '../types/types-adapter.js';

export class Track<T, V extends TrackEventDataBase> {
  private ctx: Readonly<T>;
  private adapterMap: TrackAdapterMap<T, V>;
  private selectAdapterNames: unknown[];
  private selectAdapterFun?: <N>(
    ctx: T,
    adapterMap: TrackAdapterMap<T, V>
  ) => N | N[] | Promise<N> | Promise<N[]>;
  private afterFun: (context: T) => void | Promise<void>;
  private beforeFun: (context: T) => void | Promise<void>;
  private globalTransform: TrackTransformFunction<T, V>;
  private globalEventData?: Partial<V>;

  constructor(ctx: T, eventData?: Partial<V>) {
    this.adapterMap = {};
    this.selectAdapterNames = [];
    this.selectAdapterFun = undefined;
    this.ctx = ctx;
    this.globalEventData = eventData;
  }

  /**
   * Return the adapter map. generally used in UT
   *
   * @returns adapterMap
   */
  public getAdapterMap(): Readonly<TrackAdapterMap<T, V>> {
    return this.adapterMap;
  }

  public before(fns: (context: T) => void) {
    this.beforeFun = fns;
  }

  public after(fns: (context: T) => void) {
    this.afterFun = fns;
  }

  public useAdapter(adapterMap: TrackAdapterMap<T, V>) {
    this.adapterMap = adapterMap;
    this.selectAdapterNames = Object.keys(this.adapterMap);
  }

  public select<N>(names?: TrackSelectOptions<T, V, N>) {
    if (!names) {
      return;
    }
    this.selectAdapterNames = [];
    if (isFunction(names)) {
      this.selectAdapterFun<N> = names;
      return;
    }
    this.selectAdapterNames = Array.from(new Set(ensureArray(names)));
  }

  public transform(fun: TrackTransformFunction<T, V>) {
    this.globalTransform = fun;
  }

  public async executeSelect(): Promise<void> {
    let selectAdapterNames = [...this.selectAdapterNames];
    const filterAdapterMap: TrackAdapterMap<T, V> = {};
    const lasterAdapterMap: TrackAdapterMap<T, V> = {};

    //filter by custom select function
    if (this.selectAdapterFun) {
      const names = await pipe(() =>
        this.selectAdapterFun!(this.ctx, this.adapterMap)
      )();
      selectAdapterNames = Array.from(
        new Set([...selectAdapterNames, ...ensureArray(names)])
      );
    }

    // filter by adapter name
    for (const adapterName of Object.keys(this.adapterMap)) {
      if (selectAdapterNames.includes(adapterName)) {
        filterAdapterMap[adapterName] = this.adapterMap[adapterName];
      }
    }

    //filter by isTrackable status
    for (const [adapterName, adapter] of Object.entries(filterAdapterMap)) {
      if (adapter.isTrackable()) {
        lasterAdapterMap[adapterName] = adapter;
      }
    }
    this.adapterMap = lasterAdapterMap;
  }

  public async executeTransform(eventData: V): Promise<V> {
    const fun = this.globalTransform || defaultTrackTransform;
    const result = await pipe(() => {
      const finalOptions = deepMerge(this.globalEventData || {}, eventData);
      return fun(this.ctx, finalOptions as V);
    })();
    return result;
  }

  public async executeBefore() {
    await pipe(() => ensureFuncExist(this.beforeFun)(this.ctx))();
  }

  public async executeAfter() {
    await pipe(() => ensureFuncExist(this.afterFun)(this.ctx))();
  }

  public async executeTrackAdapter(eventType: keyof V, result: V): Promise<V> {
    for (const [adapterName, adapter] of Object.entries(this.adapterMap)) {
      await this.executeAdapterTrack(eventType, adapterName, adapter, result);
    }
    return result;
  }

  private async executeAdapterTrack(
    eventType: keyof V,
    adapterName: string,
    adapter: TrackAdapter<T, V>,
    result: V
  ) {
    logger.debug(
      `Track: ${adapterName} is tracking event: ${eventType.toString()}`
    );
    return await pipe(() => adapter.track(this.ctx, eventType, result))();
  }
}
