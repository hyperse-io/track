import { pipe } from '@hyperse/pipeline';
import { executeAdapterTrack } from '../helpers/helper-adapter-track.js';
import { executeFunction } from '../helpers/helper-execute.js';
import { executeSelect } from '../helpers/helper-select-adapter.js';
import { executeTrackTransform } from '../helpers/helper-track-transform.js';
import { TrackContext } from '../types/types-create.js';
import {
  TrackAdapterMap,
  TrackAfterFunction,
  TrackBeforeFunction,
  TrackEventDataBase,
  TrackSelectFunction,
  TrackTransformFunction,
} from '../types/types-track.js';

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
  private adapterMap: TrackAdapterMap<Context, EventData> = {};

  private beforeHook?: TrackBeforeFunction<Context>;
  private afterHook?: TrackAfterFunction<Context>;
  private transformHook?: TrackTransformFunction<Context, EventData>;
  private globalEventData?: Partial<EventData>;

  constructor(context: Context, eventData?: Partial<EventData>) {
    this.ctx = context;
    this.globalEventData = eventData;
  }

  public init<AdapterMap extends TrackAdapterMap<Context, EventData>>(
    fun: () => AdapterMap
  ) {
    return this.executeInit(fun);
  }

  private buildInitChainer<AdapterName>() {
    return {
      before: this.mountBeforeHook<AdapterName>,
      after: this.mountAfterHook<AdapterName>,
      transform: this.mountTransformHook<AdapterName>,
      select: this.executeSelect<AdapterName>,
      track: this.executeSelect<AdapterName>().track,
    };
  }

  private buildBeforeChainer<AdapterName>() {
    return {
      after: this.mountAfterHook<AdapterName>,
      transform: this.mountTransformHook<AdapterName>,
      select: this.executeSelect<AdapterName>,
      track: this.executeSelect<AdapterName>().track,
    };
  }

  private buildAfterChainer = <AdapterName>() => {
    return {
      transform: this.mountTransformHook<AdapterName>,
      select: this.executeSelect<AdapterName>,
      track: this.executeSelect<AdapterName>().track,
    };
  };

  private buildTransformChainer = <AdapterName>() => {
    return {
      select: this.executeSelect<AdapterName>,
      track: this.executeSelect<AdapterName>().track,
    };
  };

  private mountBeforeHook = <AdapterName>(
    fun: TrackBeforeFunction<Context>
  ) => {
    this.beforeHook = fun;
    return this.buildBeforeChainer<AdapterName>();
  };

  private mountAfterHook = <AdapterName>(fun: TrackAfterFunction<Context>) => {
    this.afterHook = fun;
    return this.buildAfterChainer<AdapterName>();
  };

  private mountTransformHook = <AdapterName>(
    fun: TrackTransformFunction<Context, EventData>
  ) => {
    this.transformHook = fun;
    return this.buildTransformChainer<AdapterName>();
  };

  private executeInit = <
    AdapterMap extends TrackAdapterMap<Context, EventData>,
  >(
    fun: () => AdapterMap
  ) => {
    const adapterMap = fun();
    this.adapterMap = adapterMap;
    return this.buildInitChainer<keyof typeof adapterMap>();
  };

  private executeSelect = <AdapterName>(
    selectRule: TrackSelectFunction<Context, EventData, AdapterName> = []
  ) => {
    const innerCtx = this.ctx;
    const innerTrackAdapterMap = this.adapterMap;
    const innerGlobalEventData = this.globalEventData;
    const innerTransformHook = this.transformHook;
    const innerBeforeHook = this.beforeHook;
    const innerAfterHook = this.afterHook;

    async function executeTrack(
      eventType: keyof EventData,
      eventData: EventData
    ) {
      try {
        await pipe(
          async () => {
            await executeFunction(innerBeforeHook, innerCtx);
          },
          async () => {
            const transformEventData = await executeTrackTransform<
              Context,
              EventData
            >(innerCtx, eventData, innerGlobalEventData, innerTransformHook);
            return { transformEventData };
          },
          async ({ transformEventData }) => {
            const adapterMap = await executeSelect(
              innerCtx,
              innerTrackAdapterMap,
              selectRule
            );
            return { adapterMap, transformEventData };
          },
          async ({ adapterMap, transformEventData }) => {
            await executeAdapterTrack(
              innerCtx,
              adapterMap,
              eventType,
              transformEventData
            );
          },
          async () => {
            await executeFunction(innerAfterHook, innerCtx);
          }
        )();
      } catch (error) {
        innerCtx.logger?.error(error);
      }
    }
    return { track: executeTrack };
  };
}
