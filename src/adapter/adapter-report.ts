import { pipe } from '@hyperse/pipeline';
import { ensureFuncExist } from '../helpers/helper-ensure-func-exist.js';
import { isFunction } from '../helpers/helper-is-function.js';
import { TrackAdapter } from '../types/types-adapter.js';
import { TrackEventValueBase } from '../types/types-track.js';

export class ReportAdapter<T, V extends TrackEventValueBase>
  implements TrackAdapter<T, V>
{
  private _trackable: boolean = true;
  private initFun: (context: Readonly<T>) => void;
  private beforeFun: (context: Readonly<T>) => void;
  private afterFun: (context: Readonly<T>) => void;
  private transformFun: <R>(
    context: Readonly<T>,
    eventType: keyof V,
    eventData: V
  ) => R;
  private reportFun: <R>(context: Readonly<T>, eventData: R) => void;

  setTrackable(trackable: boolean | (() => boolean)) {
    if (isFunction(trackable)) {
      this._trackable = trackable?.();
    } else {
      this._trackable = trackable;
    }
  }

  init(fun: (context: T) => void): void {
    this.initFun = fun;
  }

  before(fun: (context: T) => void): void {
    this.beforeFun = fun;
  }

  after(fun: (context: T) => void): void {
    this.afterFun = fun;
  }

  transform<R>(fun: (context: T, eventType: keyof V, eventData: V) => R) {
    this.transformFun<R> = fun;
  }

  report<R>(fun: (context: T, eventData: R) => void) {
    this.reportFun<R> = fun;
  }

  isTrackable(): boolean {
    return this._trackable;
  }

  private executeInit = async (ctx: T) => {
    await pipe(() => ensureFuncExist(this.initFun)(ctx))();
  };

  private executeBefore = async (ctx: T) => {
    await pipe(() => ensureFuncExist(this.beforeFun)(ctx))();
  };

  private executeAfter = async (ctx: T) => {
    await pipe(() => ensureFuncExist(this.afterFun)(ctx))();
  };

  private executeTransform = async (
    ctx: T,
    eventType: keyof V,
    eventData: V
  ) => {
    if (!this.transformFun) {
      //TODO 输出waring日志
      return eventData;
    }
    const result = await pipe(() =>
      this.transformFun(ctx, eventType, eventData)
    )();
    return result;
  };

  private executeReport = async <R>(ctx: T, result: R) => {
    if (!this.reportFun) {
      throw new Error('report function is not defined');
    }
    if (!result) {
      //TODO 输出waring日志
      return;
    }
    await pipe(() => this.reportFun<typeof result>(ctx, result))();
  };

  /**
   * Tracks an event with the given context, event type, and eventData.
   * @param ctx - The context object.
   * @param eventType - The type of the event.
   * @param eventData - The eventData data for the event.
   * @returns A promise that resolves when the tracking is complete.
   */
  async track(ctx: T, eventType: keyof V, eventData: V): Promise<void> {
    await pipe(
      async () => await this.executeInit(ctx),
      async () => await this.executeBefore(ctx),
      async () => await this.executeTransform(ctx, eventType, eventData),
      async (result) => await this.executeReport(ctx, result),
      async () => await this.executeAfter(ctx)
    )();
  }
}
