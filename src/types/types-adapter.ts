import { TrackAdapterOptions, TrackContext } from './types-create.js';
import { TrackEventDataBase } from './types-track.js';

export type AdapterReportData = any;

export type AdapterFunctionVoid<Context> = (
  ctx: Context
) => void | Promise<void>;

export type AdapterBeforeFunction<Context, EventData> = (
  ctx: Context,
  eventType: keyof EventData,
  eventData: EventData
) => void | Promise<void>;

export type AdapterAfterFunction<Context, EventData, ReportData> = (
  ctx: Context,
  eventType: keyof EventData,
  eventData: ReportData
) => void | Promise<void>;

export type AdapterTransformFunction<Context, EventData, ReportData> = (
  ctx: Context,
  eventType: keyof EventData,
  eventData: EventData
) => ReportData | Promise<ReportData>;

export interface TrackAdapter<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
  AdapterOptions extends TrackAdapterOptions<Context, EventData>,
> {
  _mountSetupHook(fun?: AdapterOptions['setup']): void;
  _mountBeforeHook(fun: AdapterBeforeFunction<Context, EventData>): void;
  _mountAfterHook<ReportData>(
    fun: AdapterAfterFunction<Context, EventData, ReportData>
  ): void;
  _mountTransformHook<ReportData>(
    fun: AdapterTransformFunction<Context, EventData, ReportData>
  ): void;
  isTrackable(): boolean | Promise<boolean>;
  track(
    ctx: Context,
    eventType: keyof EventData,
    eventData: EventData
  ): Promise<void>;
}
