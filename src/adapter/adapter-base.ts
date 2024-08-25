import { pipe } from '@hyperse/pipeline';
import { executeFunction } from '../helpers/helper-execute.js';
import {
  AdapterAfterFunction,
  AdapterBeforeFunction,
  AdapterReportData,
  AdapterTransformFunction,
  GetSafeRealEventTypes,
  TrackAdapter,
} from '../types/types-adapter.js';
import { TrackAdapterOptions, TrackContext } from '../types/types-create.js';
import { TrackEventDataBase } from '../types/types-track.js';

export abstract class BaseAdapter<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
  AdapterOptions extends TrackAdapterOptions<Context, EventData, RealEventData>,
  RealEventData extends TrackEventDataBase = EventData,
> implements TrackAdapter<Context, EventData, AdapterOptions, RealEventData>
{
  private setupHook?: AdapterOptions['setup'];
  private beforeHook?: AdapterBeforeFunction<Context, EventData>;
  private transformHookMap: {
    [K in keyof EventData]?: {
      realEventType: keyof RealEventData | keyof EventData;
      execute: AdapterTransformFunction<Context, K, EventData, RealEventData>;
    };
  } = {};

  private afterHook?: AdapterAfterFunction<Context, RealEventData, EventData>;

  abstract isTrackable<
    EventType extends GetSafeRealEventTypes<RealEventData, EventData>,
  >(
    ctx: Context,
    eventType: GetSafeRealEventTypes<RealEventData, EventData>,
    reportData?:
      | AdapterReportData<RealEventData, EventData, EventType>
      | Awaited<AdapterReportData<RealEventData, EventData, EventType>>
  ): boolean | Promise<boolean>;

  protected isEventOfReportDataEqual<
    EventType extends GetSafeRealEventTypes<RealEventData, EventData>,
  >(
    eventType: GetSafeRealEventTypes<RealEventData, EventData>,
    reportData: RealEventData[keyof RealEventData] | EventData[keyof EventData],
    realEventType: EventType
  ): reportData is AdapterReportData<RealEventData, EventData, EventType> {
    return eventType === realEventType;
  }

  protected report<
    EventType extends GetSafeRealEventTypes<RealEventData, EventData>,
  >(
    ctx: Context,
    eventType: GetSafeRealEventTypes<RealEventData, EventData>,
    reportData?:
      | AdapterReportData<RealEventData, EventData, EventType>
      | Awaited<AdapterReportData<RealEventData, EventData, EventType>>,
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

  public _mountAfterHook(
    fun: AdapterAfterFunction<Context, RealEventData, EventData>
  ): void {
    this.afterHook = fun;
  }

  public _mountTransformHook<
    EventType extends keyof EventData | [keyof EventData, keyof RealEventData],
  >(
    eventType: EventType,
    fun: AdapterTransformFunction<
      Context,
      keyof EventData,
      EventData,
      RealEventData
    >
  ) {
    if (typeof eventType === 'string') {
      this.transformHookMap[eventType] = {
        realEventType: eventType,
        execute: fun,
      };
    } else if (Array.isArray(eventType)) {
      this.transformHookMap[eventType[0]] = {
        realEventType: eventType[1],
        execute: fun,
      };
    }
  }

  private executeTransform = async <EventType extends keyof EventData>(
    adapterName: string,
    ctx: Context,
    eventType: EventType,
    eventData: EventData[EventType]
  ) => {
    const transformHook = this.transformHookMap[eventType];

    if (!transformHook) {
      ctx.logger?.debug(
        `Adapter ${adapterName}: transform hook is not defined`
      );
      return {
        reportData: eventData,
        realEventType: eventType as unknown as GetSafeRealEventTypes<
          RealEventData,
          EventData
        >,
      };
    }

    const reportData = await executeFunction(
      transformHook.execute,
      ctx,
      eventType,
      eventData
    );

    return {
      reportData,
      realEventType:
        transformHook.realEventType as unknown as GetSafeRealEventTypes<
          RealEventData,
          EventData
        >,
    };
  };

  private executeReport = async <
    EventType extends GetSafeRealEventTypes<RealEventData, EventData>,
  >(
    adapterName: string,
    ctx: Context,
    realEventType: GetSafeRealEventTypes<RealEventData, EventData>,
    eventData: EventData[keyof EventData],
    reportData?:
      | AdapterReportData<RealEventData, EventData, EventType>
      | Awaited<AdapterReportData<RealEventData, EventData, EventType>>
  ) => {
    const isTrackable = await executeFunction(
      this.isTrackable,
      ctx,
      realEventType,
      reportData
    );

    if (!isTrackable) {
      ctx.logger?.warn(`Adapter ${adapterName}: is not trackable`);
      return;
    }

    let setupResult;
    if (this.setupHook) {
      setupResult = await this.setupHook(ctx, realEventType, eventData);
    }
    await this.report(ctx, realEventType, reportData, setupResult);
  };

  /**
   * Tracks an event.
   *
   * @param adapterName - The adapter name.
   * @param ctx - The context object.
   * @param eventType - The type of the event.
   * @param eventData - The data associated with the event.
   * @returns A promise that resolves when the tracking is complete.
   */
  public async track<EventType extends keyof EventData>(
    adapterName: string,
    ctx: Context,
    eventType: EventType,
    eventData: EventData[EventType]
  ): Promise<void> {
    await pipe(
      async () =>
        await executeFunction(this.beforeHook, ctx, eventType, eventData),
      async () =>
        await this.executeTransform(adapterName, ctx, eventType, eventData),
      async ({ reportData, realEventType }) => {
        await this.executeReport(
          adapterName,
          ctx,
          realEventType,
          eventData,
          reportData
        );
        return { reportData, realEventType };
      },
      async ({ reportData, realEventType }) =>
        await executeFunction(this.afterHook, ctx, realEventType, reportData)
    )();
  }
}
