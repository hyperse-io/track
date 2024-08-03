import { pipe } from '@hyperse/pipeline';
import { executeFunction } from '../helpers/helper-execute.js';
import {
  AdapterAfterFunction,
  AdapterBeforeFunction,
  AdapterReportData,
  AdapterSetTrackableFunction,
  AdapterTransformFunction,
  TrackAdapter,
} from '../types/types-adapter.js';
import { TrackAdapterOptions, TrackContext } from '../types/types-create.js';
import { TrackEventDataBase } from '../types/types-track.js';

export abstract class BaseAdapter<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
  AdapterOptions extends TrackAdapterOptions<Context, EventData>,
> implements TrackAdapter<Context, EventData, AdapterOptions>
{
  private trackableFun: AdapterSetTrackableFunction<Context> = true;
  private setupFun?: AdapterOptions['setup'];
  private beforeFun: AdapterBeforeFunction<Context, EventData>;
  private transformFun: AdapterTransformFunction<Context, EventData, any>;
  private afterFun: AdapterAfterFunction<
    Context,
    EventData,
    Awaited<ReturnType<typeof this.transformFun>>
  >;

  protected report(
    ctx: Context,
    reportData: AdapterReportData,
    setupData?: Required<AdapterOptions>['setup'] extends (...args: any) => any
      ? Awaited<ReturnType<Required<AdapterOptions>['setup']>>
      : undefined
  ): void | Promise<void> {}

  public _setup(fun?: AdapterOptions['setup']) {
    this.setupFun = fun;
  }

  public _setTrackable(fun: AdapterSetTrackableFunction<Context>) {
    this.trackableFun = fun;
  }

  public isTrackable(): AdapterSetTrackableFunction<Context> {
    return this.trackableFun;
  }

  public before(fun: AdapterBeforeFunction<Context, EventData>): void {
    this.beforeFun = fun;
  }

  public after<ReportData>(
    fun: AdapterAfterFunction<Context, EventData, ReportData>
  ): void {
    this.afterFun = fun;
  }

  public transform<ReportData>(
    fun: AdapterTransformFunction<Context, EventData, ReportData>
  ) {
    this.transformFun = fun;
  }

  private executeTransform = async (
    ctx: Context,
    eventType: keyof EventData,
    eventData: EventData
  ) => {
    if (!this.transformFun) {
      ctx.logger?.warn('Adapter transform hook is not defined');
      return eventData;
    }
    const result = await executeFunction(
      this.transformFun,
      ctx,
      eventType,
      eventData
    );
    return result;
  };

  private executeReport = async <ReportData>(
    ctx: Context,
    eventData: EventData,
    reportData: ReportData
  ): Promise<ReportData> => {
    let setupResult;
    if (this.setupFun) {
      setupResult = await pipe(() => this.setupFun?.(ctx, eventData))();
    }
    await this.report(ctx, reportData, setupResult);
    return reportData;
  };

  /**
   * Tracks an event.
   *
   * @param ctx - The context object.
   * @param eventType - The type of the event.
   * @param eventData - The data associated with the event.
   * @returns A promise that resolves when the tracking is complete.
   */
  public async track(
    ctx: Context,
    eventType: keyof EventData,
    eventData: EventData
  ): Promise<void> {
    await pipe(
      async () =>
        await executeFunction(this.beforeFun, ctx, eventType, eventData),
      async () => await this.executeTransform(ctx, eventType, eventData),
      async (reportData) =>
        await this.executeReport(ctx, eventData, reportData),
      async (reportData) =>
        await executeFunction(this.afterFun, ctx, eventType, reportData)
    )();
  }
}
