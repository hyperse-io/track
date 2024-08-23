import { UnionToTuple } from '../types/type-union-tuple.js';
import {
  AdapterAfterFunction,
  AdapterBeforeFunction,
  TrackAdapter,
  TransformEventData,
  TransformEventType,
  TransformReturns,
} from '../types/types-adapter.js';
import { TrackAdapterOptions, TrackContext } from '../types/types-create.js';
import { TrackEventDataBase } from '../types/types-track.js';

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
      transform: this.mountTransformHook,
      build: this.executeBuild,
    };
  }

  private buildSetupChainer() {
    return {
      before: this.mountBeforeHook,
      transform: this.mountTransformHook,
      build: this.executeBuild,
    };
  }

  private buildBeforeChainer() {
    return {
      transform: this.mountTransformHook,
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

    const result = {
      transform: transform,
      ...this.buildTransformChainer(),
    };

    return result as UnionToTuple<
      Exclude<
        keyof LeftEventData,
        TransformEventType<Key, RealEventData, LeftEventData>
      >
    >['length'] extends 0
      ? ReturnType<typeof this.buildTransformChainer>
      : typeof result;
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
