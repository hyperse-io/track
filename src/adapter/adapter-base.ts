import { pipe } from '@hyperse/pipeline';
import { executeFunction } from '../helpers/helper-execute.js';
import {
  AdapterAfterFunction,
  AdapterBeforeFunction,
  AdapterReportData,
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
  private setupHook?: AdapterOptions['setup'];
  private beforeHook?: AdapterBeforeFunction<Context, EventData>;
  private transformHook?: AdapterTransformFunction<Context, EventData, any>;
  private afterHook?: AdapterAfterFunction<
    Context,
    EventData,
    Awaited<ReturnType<AdapterTransformFunction<Context, EventData, any>>>
  >;

  abstract isTrackable(): boolean | Promise<boolean>;

  protected report(
    ctx: Context,
    reportData: AdapterReportData,
    setupData?: Required<AdapterOptions>['setup'] extends (...args: any) => any
      ? Awaited<ReturnType<Required<AdapterOptions>['setup']>>
      : undefined
  ): void | Promise<void> {}

  public _mountSetupHook(fun?: AdapterOptions['setup']) {
    this.setupHook = fun;
  }

  public _mountBeforeHook(
    fun: AdapterBeforeFunction<Context, EventData>
  ): void {
    this.beforeHook = fun;
  }

  public _mountAfterHook<ReportData>(
    fun: AdapterAfterFunction<Context, EventData, ReportData>
  ): void {
    this.afterHook = fun;
  }

  public _mountTransformHook<ReportData>(
    fun: AdapterTransformFunction<Context, EventData, ReportData>
  ) {
    this.transformHook = fun;
  }

  private executeTransform = async (
    ctx: Context,
    eventType: keyof EventData,
    eventData: EventData
  ) => {
    if (!this.transformHook) {
      ctx.logger?.warn('Adapter transform hook is not defined');
      return eventData;
    }
    const result = await executeFunction(
      this.transformHook,
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
    if (this.setupHook) {
      setupResult = await this.setupHook(ctx, eventData);
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
        await executeFunction(this.beforeHook, ctx, eventType, eventData),
      async () => await this.executeTransform(ctx, eventType, eventData),
      async (reportData) =>
        await this.executeReport(ctx, eventData, reportData),
      async (reportData) =>
        await executeFunction(this.afterHook, ctx, eventType, reportData)
    )();
  }
}
