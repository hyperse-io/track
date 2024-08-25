import { TrackAdapterOptions, TrackContext } from './types-create.js';
import { TrackEventDataBase } from './types-track.js';

export type TransformReturns<Key, RealEventData, EventData> =
  Key extends keyof EventData
    ? EventData[Key] | Promise<EventData[Key]>
    : Key extends [keyof EventData, keyof RealEventData]
      ? RealEventData[Key[1]] | Promise<RealEventData[Key[1]]>
      : never;

export type TransformEventType<Key, RealEventData, EventData> =
  Key extends keyof EventData
    ? Key
    : Key extends [keyof EventData, keyof RealEventData]
      ? Key[0]
      : never;

export type TransformEventData<Key, RealEventData, EventData> =
  Key extends keyof EventData
    ? EventData[Key]
    : Key extends [keyof EventData, keyof RealEventData]
      ? EventData[Key[0]]
      : never;

export type CheckUndefined<RealEventData, EventData> =
  RealEventData extends undefined ? keyof EventData : keyof RealEventData;

/**
 * Represents the data reported by the adapter.
 */
export type AdapterReportData<
  RealEventData,
  EventData,
  EventType = CheckUndefined<RealEventData, EventData>,
> = EventType extends keyof EventData
  ? EventData[EventType]
  : EventType extends keyof RealEventData
    ? RealEventData[EventType]
    : never;

/**
 * Represents a function that takes a context and returns void or a promise that resolves to void.
 */
export type AdapterFunctionVoid<Context> = (
  ctx: Context
) => void | Promise<void>;

/**
 * The adapter hook function is executed before tracking an event.
 */
export type AdapterBeforeFunction<Context, EventData> = (
  ctx: Context,
  eventType: keyof EventData,
  eventData: EventData[keyof EventData]
) => void | Promise<void>;

/**
 * The adapter hook function is triggered after the report is executed
 */
export type AdapterAfterFunction<Context, RealEventData, EventData> = (
  ctx: Context,
  eventType: CheckUndefined<RealEventData, EventData>,
  reportData?:
    | AdapterReportData<RealEventData, EventData>
    | Awaited<AdapterReportData<RealEventData, EventData>>
) => void | Promise<void>;

/**
 * The adapter hook function that converts EventData corresponding to different EventType
 */
export type AdapterTransformFunction<
  Context,
  EventType extends keyof EventData,
  EventData,
  RealEventData extends TrackEventDataBase,
> = (
  ctx: Context,
  eventType: EventType,
  eventData: EventData[EventType]
) =>
  | AdapterReportData<RealEventData, EventData>
  | Promise<AdapterReportData<RealEventData, EventData>>;

/**
 * Track adapter interface.
 */
export interface TrackAdapter<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
  AdapterOptions extends TrackAdapterOptions<Context, EventData, RealEventData>,
  RealEventData extends TrackEventDataBase,
> {
  /**
   * The adapter hook Performs data consolidation against the rules defined by AdapterOptions
   * Passes the returned results to report
   * Executes before the report function is called
   */
  _mountSetupHook(fun?: AdapterOptions['setup']): void;

  /**
   * The adapter hook function is executed before tracking an event.
   */
  _mountBeforeHook(fun: AdapterBeforeFunction<Context, EventData>): void;

  /**
   *  The adapter hook function is triggered after the report is executed
   */
  _mountAfterHook(
    fun: AdapterAfterFunction<Context, RealEventData, EventData>
  ): void;

  /**
   * The adapter hook function that converts EventData corresponding to different EventType
   * @param eventType The type of the event.
   * @param fun The transform function.
   */
  _mountTransformHook<
    EventType extends keyof EventData | [keyof EventData, keyof RealEventData],
  >(
    eventType: EventType,
    fun: AdapterTransformFunction<
      Context,
      keyof EventData,
      EventData,
      RealEventData
    >
  ): void;

  /**
   * Determines if an event is trackable based on the provided context, event type, and event data.
   *
   * @param ctx - The context in which the event is being processed.
   * @param eventType - The type of the event to check, which can be either from `RealEventData` or `EventData`.
   *                    If `RealEventData` is `undefined`, it uses `EventData`.
   * @param reportData - The data associated with the event. If `RealEventData` is `undefined`,
   *                    it uses data from `EventData`; otherwise, it uses data from `RealEventData`.
   * @returns A boolean or a promise that resolves to a boolean indicating whether the event is trackable.
   */
  isTrackable<EventType extends CheckUndefined<RealEventData, EventData>>(
    ctx: Context,
    eventType: EventType,
    reportData?:
      | AdapterReportData<RealEventData, EventData, EventType>
      | Awaited<AdapterReportData<RealEventData, EventData, EventType>>
  ): boolean | Promise<boolean>;

  /**
   * Tracks an event.
   * @param adapterName The adapter Name.
   * @param ctx The track context.
   * @param eventType The type of the event.
   * @param eventData The data associated with the event.
   */
  track<EventType extends keyof EventData>(
    adapterName: string,
    ctx: Context,
    eventType: EventType,
    eventData: EventData[EventType]
  ): Promise<void>;
}
