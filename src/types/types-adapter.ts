export type AdapterTransformResult = any;

export type ReportAdapterFunctionVoid<T, V> = (
  ctx: T,
  options: V
) => void | Promise<void>;

export type ReportAdapterTransformFunction<T, V> = (
  ctx: T,
  options: V
) => AdapterTransformResult | Promise<AdapterTransformResult>;

export interface TrackAdapter<T, V> {
  init(fun: (context: T) => void): void;
  before(fun: (context: T) => void): void;
  after(fun: (context: T) => void): void;
  transform<R>(fun: (context: T, eventType: keyof V, eventData: V) => R): void;
  report<R>(fun: (context: T, eventData: R) => void): void;
  setTrackable(trackable: boolean | (() => boolean)): void;
  isTrackable(): boolean;
  track(ctx: T, eventType: keyof V, eventData: V): Promise<void>;
}
