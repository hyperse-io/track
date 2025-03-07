import type {
  AdapterAfterFunction,
  AdapterBeforeFunction,
  TrackAdapter,
  TransformEventData,
  TransformEventType,
  TransformReturns,
} from '../types/types-adapter.js';
import type {
  TrackAdapterOptions,
  TrackContext,
} from '../types/types-create.js';
import type { TrackEventDataBase } from '../types/types-track.js';
import type { TransformHook } from '../types/types-transform-hook.js';

/**
 * A builder for creating a track adapter.
 *
 * @template Context - The type of the track context.
 * @template EventData - The type of the track event data.
 * @template AdapterOptions - The type of the track adapter options.
 */
export class AdapterBuilder<
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
  AdapterOptions extends TrackAdapterOptions<Context, EventData, RealEventData>,
  RealEventData extends TrackEventDataBase = EventData,
> {
  private adapter: TrackAdapter<
    Context,
    EventData,
    AdapterOptions,
    RealEventData
  >;

  constructor(
    _adapter: TrackAdapter<Context, EventData, AdapterOptions, RealEventData>
  ) {
    this.adapter = _adapter;
  }

  public init() {
    return this.executeInit();
  }

  private buildInitChainer() {
    return {
      setup: this.mountSetupHook,
      before: this.mountBeforeHook,
      transform: this.mountTransformHook as TransformHook<
        ReturnType<typeof AdapterBuilder.prototype.buildTransformChainer>,
        Context,
        EventData,
        RealEventData
      >,
      build: this.executeBuild,
    };
  }

  private buildSetupChainer() {
    return {
      before: this.mountBeforeHook,
      transform: this.mountTransformHook as TransformHook<
        ReturnType<typeof AdapterBuilder.prototype.buildTransformChainer>,
        Context,
        EventData,
        RealEventData
      >,
      build: this.executeBuild,
    };
  }

  private buildBeforeChainer() {
    return {
      transform: this.mountTransformHook as TransformHook<
        ReturnType<typeof AdapterBuilder.prototype.buildTransformChainer>,
        Context,
        EventData,
        RealEventData
      >,
      build: this.executeBuild,
    };
  }

  private buildAfterChainer() {
    return {
      build: this.executeBuild,
    };
  }

  private executeInit = () => {
    return this.buildInitChainer();
  };

  private mountSetupHook = (fun?: AdapterOptions['setup']) => {
    this.adapter._mountSetupHook(fun);
    return this.buildSetupChainer();
  };

  private mountBeforeHook = (
    fun: AdapterBeforeFunction<Context, EventData>
  ) => {
    this.adapter._mountBeforeHook(fun);
    return this.buildBeforeChainer();
  };

  private buildTransformChainer() {
    return {
      after: this.mountAfterHook,
      build: this.executeBuild,
    };
  }

  private mountTransformHook = <
    Key extends
      | keyof LeftEventData
      | [keyof LeftEventData, keyof RealEventData],
    LeftEventData = EventData,
  >(
    eventType: Key,
    fun: (
      ctx: Context,
      eventType: TransformEventType<Key, RealEventData, LeftEventData>,
      eventData: TransformEventData<Key, RealEventData, LeftEventData>
    ) => TransformReturns<Key, RealEventData, LeftEventData>
  ) => {
    this.adapter._mountTransformHook(
      eventType as keyof EventData | [keyof EventData, keyof RealEventData],
      fun as (
        ...args: any[]
      ) => TransformReturns<keyof EventData, RealEventData, EventData>
    );

    const transform = <
      RightKey extends
        | keyof RightEventData
        | [keyof RightEventData, keyof RealEventData],
      RightEventData = Key extends keyof LeftEventData
        ? Omit<LeftEventData, Key>
        : Key extends [keyof LeftEventData, keyof RealEventData]
          ? Omit<LeftEventData, Key[0]>
          : never,
    >(
      eventType: RightKey,
      fun: (
        ctx: Context,
        eventType: TransformEventType<RightKey, RealEventData, RightEventData>,
        eventData: TransformEventData<RightKey, RealEventData, RightEventData>
      ) => TransformReturns<RightKey, RealEventData, RightEventData>
    ) => {
      this.adapter._mountTransformHook(
        eventType as keyof EventData | [keyof EventData, keyof RealEventData],
        fun as (
          ...args: any[]
        ) => TransformReturns<keyof EventData, RealEventData, EventData>
      );
      return this.mountTransformHook<RightKey, RightEventData>(eventType, fun);
    };

    return {
      transform: transform,
      ...this.buildTransformChainer(),
    };
  };

  private mountAfterHook = (
    fun: AdapterAfterFunction<Context, RealEventData, EventData>
  ) => {
    this.adapter._mountAfterHook(fun);
    return this.buildAfterChainer();
  };

  private executeBuild = () => {
    return this.adapter;
  };
}
