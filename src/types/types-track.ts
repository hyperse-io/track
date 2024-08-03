import { TrackAdapter } from './types-adapter.js';
import { TrackContext } from './types-create.js';

export type TrackBeforeFunction<Context extends TrackContext<any>> = (
  ctx: Context
) => void | Promise<void>;

export type TrackAfterFunction<Context extends TrackContext<any>> = (
  ctx: Context
) => void | Promise<void>;

export type TrackTransformFunction<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
> = (ctx: Context, options: EventData) => EventData | Promise<EventData>;

export type TrackSelectOptions<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
  AdapterName,
> =
  | AdapterName
  | AdapterName[]
  | ((
      ctx: Context,
      adapterMap: TrackAdapterMap<Context, EventData>
    ) =>
      | AdapterName
      | AdapterName[]
      | Promise<AdapterName>
      | Promise<AdapterName[]>);

export type TrackEventDataBase = {
  [eventType: string]: any;
};

export type TrackAdapterMap<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
> = {
  [name: string]: TrackAdapter<Context, EventData, any>;
};
