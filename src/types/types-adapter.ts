import { TrackAdapterOptions, TrackContext } from './types-create.js';
import { TrackEventDataBase } from './types-track.js';

export type AdapterReportData = any;

export type AdapterSetupData = any;

export type AdapterFunctionVoid<Context> = (
  ctx: Context
) => void | Promise<void>;

export type AdapterSetTrackableFunction<Context> =
  | boolean
  | ((ctx: Context) => boolean | Promise<boolean>);

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
  _setup(fun?: AdapterOptions['setup']): void;
  _setTrackable(fun: AdapterSetTrackableFunction<Context>): void;
  before(fun: AdapterBeforeFunction<Context, EventData>): void;
  after<ReportData>(
    fun: AdapterAfterFunction<Context, EventData, ReportData>
  ): void;
  transform<ReportData>(
    fun: AdapterTransformFunction<Context, EventData, ReportData>
  ): void;
  isTrackable(): AdapterSetTrackableFunction<Context>;
  track(
    ctx: Context,
    eventType: keyof EventData,
    eventData: EventData
  ): Promise<void>;
}
