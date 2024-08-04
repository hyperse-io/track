import { TrackLogger } from './types-logger.js';
import { TrackEventDataBase } from './types-track.js';

export type TrackCreateOptions<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
> = {
  eventData?: Partial<EventData>;
  createData?: (
    eventData?: Partial<EventData>
  ) => Context['data'] | Promise<Context['data']>;
} & Omit<TrackContext<any>, 'data'>;

export type TrackContext<TrackData> = {
  data: Readonly<TrackData>;
  logger?: TrackLogger<any>;
};

export type TrackAdapterOptions<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
> = {
  setup?: (ctx: Context, eventData: EventData) => any | Promise<any>;
};
