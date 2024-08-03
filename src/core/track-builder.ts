import { pipe } from '@hyperse/pipeline';
import { TrackContext } from '../types/types-create.js';
import {
  TrackAdapterMap,
  TrackAfterFunction,
  TrackBeforeFunction,
  TrackEventDataBase,
  TrackSelectOptions,
  TrackTransformFunction,
} from '../types/types-track.js';
import { Track } from './track.js';

/**
 * Represents a builder for creating and configuring a Track instance.
 * @template Context The type of the context object.
 * @template EventData The type of the track event value.
 */
export class TrackBuilder<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
> {
  private ctx: Context;
  private trackInstance: Track<Context, EventData>;

  constructor(configuration: Context, eventData?: Partial<EventData>) {
    this.ctx = configuration;
    this.trackInstance = new Track<Context, EventData>(
      configuration,
      eventData
    );
  }

  private beforeHook = (fun: TrackBeforeFunction<Context>) => {
    this.trackInstance.before(fun);
    return this.after();
  };

  private afterHook = (fun: TrackAfterFunction<Context>) => {
    this.trackInstance.after(fun);
    return this.transform();
  };

  private transformHook = (fun: TrackTransformFunction<Context, EventData>) => {
    this.trackInstance.transform(fun);
    return this.useAdapter();
  };

  private useAdapterHook = <
    AdapterMap extends TrackAdapterMap<Context, EventData>,
  >(
    fun: () => AdapterMap
  ) => {
    const adapterMap = fun();
    this.trackInstance.useAdapter(adapterMap);
    return this.select<keyof typeof adapterMap>();
  };

  private selectHook = <AdapterName>(
    names?: TrackSelectOptions<Context, EventData, AdapterName>
  ) => {
    this.trackInstance.select<AdapterName>(names);
    return this.track();
  };

  private trackHook = async (
    eventType: keyof EventData,
    eventData: EventData
  ) => {
    try {
      await pipe(
        async () => await this.trackInstance.executeBefore(),
        async () => {
          const result = await this.trackInstance.executeSelect();
          return result;
        },
        async (adapterMap) => {
          const transformEventData =
            await this.trackInstance.executeTransform(eventData);
          return { adapterMap, transformEventData };
        },
        async ({ adapterMap, transformEventData }) =>
          await this.trackInstance.executeTrackAdapter(
            adapterMap,
            eventType,
            transformEventData
          ),
        async () => await this.trackInstance.executeAfter()
      )();
    } catch (error) {
      this.ctx.logger?.error(error);
    }
  };

  public initBuilder() {
    return {
      before: this.beforeHook,
      after: this.afterHook,
      transform: this.transformHook,
      useAdapter: this.useAdapterHook,
    };
  }

  public after = () => {
    return {
      after: this.afterHook,
      transform: this.transformHook,
      useAdapter: this.useAdapterHook,
    };
  };

  public useAdapter = () => {
    return {
      useAdapter: this.useAdapterHook,
    };
  };

  public select = <AdapterName>() => {
    return {
      select: this.selectHook<AdapterName>,
      track: this.trackHook,
    };
  };

  public transform = () => {
    return {
      transform: this.transformHook,
      useAdapter: this.useAdapterHook,
    };
  };

  public track = () => {
    return {
      track: this.trackHook,
    };
  };
}
