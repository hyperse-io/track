import { pipe } from '@hyperse/pipeline';
import { executeAdapterCtx } from '../helpers/helper-adapter-ctx.js';
import { executeAdapterTrack } from '../helpers/helper-adapter-track.js';
import { deepMerge } from '../helpers/helper-deep-merge.js';
import { executeFunction } from '../helpers/helper-execute.js';
import { isFunction } from '../helpers/helper-is-function.js';
import { executeSelect } from '../helpers/helper-select-adapter.js';
import {
  TrackContext,
  TrackCreateDataFunction,
  TrackCreateOptions,
} from '../types/types-create.js';
import {
  TrackAdapterMap,
  TrackAfterFunction,
  TrackBeforeFunction,
  TrackEventDataBase,
  TrackSelectFunction,
} from '../types/types-track.js';

/**
 * The `TrackBuilder` class is responsible for building and executing tracking logic.
 * It provides methods for initializing adapters, mounting hooks, and executing tracking operations.
 *
 * @template Context - The type of the track context.
 * @template EventData - The type of the track event data.
 */
export class TrackBuilder<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
> {
  private ctx: Context;
  private adapterMap: TrackAdapterMap<Context, EventData> = {};

  private createDataHook?:
    | Context['data']
    | TrackCreateDataFunction<Context, EventData>;
  private beforeHook?: TrackBeforeFunction<Context>;
  private afterHook?: TrackAfterFunction<Context>;
  private globalEventData?: Partial<EventData>;

  constructor(options: TrackCreateOptions<Context, EventData> = {}) {
    const { eventData, logger, createData } = options;
    this.createDataHook = createData;
    const ctx = { data: {} } as Context;
    if (logger) {
      ctx.logger = logger;
    }
    this.ctx = ctx;
    this.globalEventData = eventData;
  }

  public init<AdapterMap extends TrackAdapterMap<Context, EventData>>(
    fun: AdapterMap | (() => AdapterMap)
  ) {
    return this.executeInit<AdapterMap>(fun);
  }

  private buildInitChainer<
    AdapterMap extends TrackAdapterMap<Context, EventData>,
  >() {
    return {
      before: this.mountBeforeHook<AdapterMap>,
      after: this.mountAfterHook<AdapterMap>,
      select: this.executeSelect<AdapterMap>,
      track: this.executeSelect<AdapterMap>().track,
    };
  }

  private buildBeforeChainer<
    AdapterMap extends TrackAdapterMap<Context, EventData>,
  >() {
    return {
      after: this.mountAfterHook<AdapterMap>,
      select: this.executeSelect<AdapterMap>,
      track: this.executeSelect<AdapterMap>().track,
    };
  }

  private buildAfterChainer = <
    AdapterMap extends TrackAdapterMap<Context, EventData>,
  >() => {
    return {
      select: this.executeSelect<AdapterMap>,
      track: this.executeSelect<AdapterMap>().track,
    };
  };

  private mountBeforeHook = <
    AdapterMap extends TrackAdapterMap<Context, EventData>,
  >(
    fun: TrackBeforeFunction<Context>
  ) => {
    this.beforeHook = fun;
    return this.buildBeforeChainer<AdapterMap>();
  };

  private mountAfterHook = <
    AdapterMap extends TrackAdapterMap<Context, EventData>,
  >(
    fun: TrackAfterFunction<Context>
  ) => {
    this.afterHook = fun;
    return this.buildAfterChainer<AdapterMap>();
  };

  private executeInit = <
    AdapterMap extends TrackAdapterMap<Context, EventData>,
  >(
    adapterMap: AdapterMap | (() => AdapterMap)
  ) => {
    if (isFunction(adapterMap)) {
      this.adapterMap = adapterMap();
    } else {
      this.adapterMap = adapterMap;
    }
    return this.buildInitChainer<AdapterMap>();
  };

  private executeSelect = <
    AdapterMap extends TrackAdapterMap<Context, EventData>,
  >(
    selectRule: TrackSelectFunction<Context, EventData, AdapterMap> = []
  ) => {
    const innerCtx = this.ctx;
    const innerTrackAdapterMap = this.adapterMap;
    const innerGlobalEventData = this.globalEventData;
    const innerBeforeHook = this.beforeHook;
    const innerAfterHook = this.afterHook;
    const innerCreateDataHook = this.createDataHook;

    async function executeTrack<EventType extends keyof EventData>(
      eventType: EventType,
      eventData: EventData[EventType]
    ) {
      try {
        await pipe(
          async () => {
            const trackCtx = await executeAdapterCtx(
              innerCtx,
              innerGlobalEventData,
              innerCreateDataHook
            );
            return { trackCtx };
          },
          async ({ trackCtx }) => {
            await executeFunction(innerBeforeHook, trackCtx);
            return { trackCtx };
          },
          async ({ trackCtx }) => {
            const adapterMap = await executeSelect<
              Context,
              EventType,
              EventData,
              AdapterMap
            >(
              trackCtx,
              eventType,
              eventData,
              innerTrackAdapterMap as AdapterMap,
              selectRule
            );
            return { trackCtx, adapterMap };
          },
          async ({ trackCtx, adapterMap }) => {
            let finalEventData = eventData;
            if (innerGlobalEventData?.[eventType]) {
              finalEventData = deepMerge(
                innerGlobalEventData[eventType],
                eventData
              );
            }
            await executeAdapterTrack(
              trackCtx,
              adapterMap,
              eventType,
              finalEventData
            );
            return { trackCtx };
          },
          async ({ trackCtx }) => {
            await executeFunction(innerAfterHook, trackCtx);
          }
        )();
      } catch (error) {
        innerCtx.logger?.error(error);
      }
    }
    return { track: executeTrack };
  };
}
