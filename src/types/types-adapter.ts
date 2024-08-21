import { TrackAdapterOptions, TrackContext } from './types-create.js';
import { TrackEventDataBase } from './types-track.js';

/**
 * Represents the data reported by the adapter.
 */
export type AdapterReportData = any;

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
export type AdapterAfterFunction<Context, EventData> = (
  ctx: Context,
  eventType: keyof EventData,
  reportData: AdapterReportData
) => void | Promise<void>;

/**
 * The adapter hook function that converts EventData corresponding to different EventType
 */
export type AdapterTransformFunction<
  Context,
  EventType extends keyof EventData,
  EventData,
> = (
  ctx: Context,
  eventType: EventType,
  eventData: EventData[EventType]
) => AdapterReportData | Promise<AdapterReportData>;

/**
 * Track adapter interface.
 */
export interface TrackAdapter<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
  AdapterOptions extends TrackAdapterOptions<Context, EventData>,
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
  _mountAfterHook(fun: AdapterAfterFunction<Context, EventData>): void;

  /**
   * The adapter hook function that converts EventData corresponding to different EventType
   * @param eventType The type of the event.
   * @param fun The transform function.
   */
  _mountTransformHook<EventType extends keyof EventData>(
    eventType: EventType,
    fun: AdapterTransformFunction<Context, EventType, EventData>
  ): void;

  /**
   * Checks if the adapter is available.
   * @param ctx The track context.
   * @param eventType The type of the event.
   * @param eventData The data associated with the event.
   * @returns A boolean indicating if the adapter is available.
   */
  isTrackable<EventType extends keyof EventData>(
    ctx: Context,
    eventType: EventType,
    eventData: EventData[EventType]
  ): boolean | Promise<boolean>;

  /**
   * Tracks an event.
   * @param ctx The track context.
   * @param eventType The type of the event.
   * @param eventData The data associated with the event.
   */
  track<EventType extends keyof EventData>(
    ctx: Context,
    eventType: EventType,
    eventData: EventData[EventType]
  ): Promise<void>;
}
