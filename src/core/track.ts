import { pipe } from '@hyperse/pipeline';
import { defaultTrackTransform } from '../constant/track-func.js';
import { deepMerge } from '../helpers/helper-deep-merge.js';
import { ensureArray } from '../helpers/helper-ensure-array.js';
import { executeFunction } from '../helpers/helper-execute.js';
import { isFunction } from '../helpers/helper-is-function.js';
import {
  TrackAdapterMap,
  TrackAfterFunction,
  TrackBeforeFunction,
  TrackEventDataBase,
  TrackSelectOptions,
  TrackTransformFunction,
} from '../types/index.js';
import { TrackContext } from '../types/types-create.js';

export class Track<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
> {
  private ctx: Context;
  private adapterMap: TrackAdapterMap<Context, EventData>;
  private beforeFun: TrackBeforeFunction<Context>;
  private afterFun: TrackAfterFunction<Context>;
  private selectFun?: TrackSelectOptions<Context, EventData, unknown>;
  private globalTransform: TrackTransformFunction<Context, EventData>;
  private globalEventData?: Partial<EventData>;

  constructor(ctx: Context, eventData?: Partial<EventData>) {
    this.adapterMap = {};
    this.ctx = ctx;
    this.globalEventData = eventData;
  }

  public before(fun: TrackBeforeFunction<Context>) {
    this.beforeFun = fun;
  }

  public after(fun: TrackAfterFunction<Context>) {
    this.afterFun = fun;
  }

  public useAdapter(adapterMap: TrackAdapterMap<Context, EventData>) {
    this.adapterMap = adapterMap;
  }

  public select<AdapterName>(
    fun?: TrackSelectOptions<Context, EventData, AdapterName>
  ) {
    this.selectFun = fun;
  }

  public transform(fun: TrackTransformFunction<Context, EventData>) {
    this.globalTransform = fun;
  }

  public async executeBefore() {
    await executeFunction(this.beforeFun, this.ctx);
  }

  public async executeAfter() {
    await executeFunction(this.afterFun, this.ctx);
  }

  public async executeSelect(): Promise<TrackAdapterMap<Context, EventData>> {
    let names = [];
    const selectFun = this.selectFun || [];

    if (isFunction(selectFun)) {
      names = await executeFunction(
        this.selectFun as (...args: any[]) => any,
        this.ctx,
        this.adapterMap
      );
    } else {
      names = ensureArray(selectFun);
    }

    if (names.length === 0) {
      names = Object.keys(this.adapterMap);
    }

    const lasterAdapterMap: TrackAdapterMap<Context, EventData> = {};
    for (const [adapterName, adapter] of Object.entries(this.adapterMap)) {
      let isTrackable = adapter.isTrackable();
      if (isFunction(isTrackable)) {
        isTrackable = await executeFunction(isTrackable, this.ctx);
      }
      if (isTrackable && names.includes(adapterName)) {
        lasterAdapterMap[adapterName] = this.adapterMap[adapterName];
      }
    }
    return lasterAdapterMap;
  }

  public async executeTransform(eventData: EventData): Promise<EventData> {
    const fun = this.globalTransform || defaultTrackTransform;
    const result = await pipe(() => {
      const finalOptions = deepMerge(this.globalEventData || {}, eventData);
      return fun(this.ctx, finalOptions as EventData);
    })();
    return result;
  }

  public async executeTrackAdapter(
    adapterMap: TrackAdapterMap<Context, EventData>,
    eventType: keyof EventData,
    result: EventData
  ): Promise<EventData> {
    for (const [adapterName, adapter] of Object.entries(adapterMap)) {
      await adapter.track(this.ctx, eventType, result);
    }
    return result;
  }
}
