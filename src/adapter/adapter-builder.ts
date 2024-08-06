import { UnionToTuple } from '../types/type-union-tuple.js';
import {
  AdapterAfterFunction,
  AdapterBeforeFunction,
  AdapterReportData,
  TrackAdapter,
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
  AdapterOptions extends TrackAdapterOptions<Context, EventData>,
> {
  private adapter: TrackAdapter<Context, EventData, AdapterOptions>;

  constructor(_adapter: TrackAdapter<Context, EventData, AdapterOptions>) {
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
    Key extends keyof LeftEventData,
    LeftEventData = EventData,
  >(
    eventType: Key,
    fun: (
      ctx: Context,
      eventType: Key,
      eventData: LeftEventData[Key]
    ) => AdapterReportData | Promise<AdapterReportData>
  ) => {
    this.adapter._mountTransformHook(
      eventType as keyof EventData,
      fun as (...args: any[]) => AdapterReportData | Promise<AdapterReportData>
    );
    const transform = <
      RightKey extends keyof RightEventData,
      RightEventData = Omit<LeftEventData, Key>,
    >(
      eventType: RightKey,
      fun: (
        ctx: Context,
        eventType: RightKey,
        eventData: RightEventData[RightKey]
      ) => AdapterReportData | Promise<AdapterReportData>
    ) => {
      this.adapter._mountTransformHook(
        eventType as keyof EventData,
        fun as (
          ...args: any[]
        ) => AdapterReportData | Promise<AdapterReportData>
      );
      return this.mountTransformHook<RightKey, RightEventData>(eventType, fun);
    };
    const result = {
      transform: transform,
      ...this.buildTransformChainer(),
    };

    return result as UnionToTuple<
      Exclude<keyof LeftEventData, Key>
    >['length'] extends 0
      ? ReturnType<typeof this.buildTransformChainer>
      : typeof result;
  };

  private mountAfterHook = (fun: AdapterAfterFunction<Context, EventData>) => {
    this.adapter._mountAfterHook(fun);
    return this.buildAfterChainer();
  };

  private executeBuild = () => {
    return this.adapter;
  };
}
