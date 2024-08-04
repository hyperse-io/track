import {
  AdapterAfterFunction,
  AdapterBeforeFunction,
  AdapterTransformFunction,
  TrackAdapter,
} from '../types/types-adapter.js';
import { TrackAdapterOptions, TrackContext } from '../types/types-create.js';
import { TrackEventDataBase } from '../types/types-track.js';

/**
 * Represents a builder for creating a track adapter.
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

  public buildInitChainer() {
    return {
      setup: this.mountSetupHook,
      before: this.mountBeforeHook,
      transform: this.mountTransformHook,
      build: this.executeBuild,
    };
  }

  public buildBeforeChainer() {
    return {
      before: this.mountBeforeHook,
      transform: this.mountTransformHook,
      build: this.executeBuild,
    };
  }

  public buildTransformChainer() {
    return {
      transform: this.mountTransformHook,
      build: this.executeBuild,
    };
  }

  public buildAfterChainer<ReportData>() {
    return {
      after: this.mountAfterHook<ReportData>,
      build: this.executeBuild,
    };
  }

  public buildChainer() {
    return {
      build: this.executeBuild,
    };
  }

  private mountSetupHook = (fun?: AdapterOptions['setup']) => {
    this.adapter._mountSetupHook(fun);
    return this.buildBeforeChainer();
  };

  private mountBeforeHook = (
    fun: AdapterBeforeFunction<Context, EventData>
  ) => {
    this.adapter._mountBeforeHook(fun);
    return this.buildTransformChainer();
  };

  private mountAfterHook = <ReportData>(
    fun: AdapterAfterFunction<Context, EventData, ReportData>
  ) => {
    this.adapter._mountAfterHook<ReportData>(fun);
    return this.buildChainer();
  };

  private mountTransformHook = <ReportData>(
    fun: AdapterTransformFunction<Context, EventData, ReportData>
  ) => {
    this.adapter._mountTransformHook<ReportData>(fun);
    return this.buildAfterChainer<ReportData>();
  };

  private executeBuild = () => {
    return this.adapter;
  };
}
