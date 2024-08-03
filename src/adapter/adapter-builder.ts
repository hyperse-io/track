import {
  AdapterAfterFunction,
  AdapterBeforeFunction,
  AdapterSetTrackableFunction,
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

  private setupHook = (fun?: AdapterOptions['setup']) => {
    this.adapter._setup(fun);
    return this.before();
  };

  private beforeHook = (fun: AdapterBeforeFunction<Context, EventData>) => {
    this.adapter.before(fun);
    return this.isTrackable();
  };

  private afterHook = <ReportData>(
    fun: AdapterAfterFunction<Context, EventData, ReportData>
  ) => {
    this.adapter.after<ReportData>(fun);
    return this.build();
  };

  private isTrackableHook = (
    trackable: AdapterSetTrackableFunction<Context>
  ) => {
    this.adapter._setTrackable(trackable);
    return this.transform();
  };

  private transformHook = <ReportData>(
    fun: AdapterTransformFunction<Context, EventData, ReportData>
  ) => {
    this.adapter.transform<ReportData>(fun);
    return this.after<ReportData>();
  };

  private buildHook = () => {
    return this.adapter;
  };

  public initBuilder() {
    return {
      setup: this.setupHook,
      before: this.beforeHook,
      isTrackable: this.isTrackableHook,
      transform: this.transformHook,
      build: this.buildHook,
    };
  }

  public before() {
    return {
      before: this.beforeHook,
      isTrackable: this.isTrackableHook,
      transform: this.transformHook,
      build: this.buildHook,
    };
  }

  public isTrackable() {
    return {
      isTrackable: this.isTrackableHook,
      transform: this.transformHook,
      build: this.buildHook,
    };
  }

  public transform() {
    return {
      transform: this.transformHook,
      build: this.buildHook,
    };
  }

  public after<ReportData>() {
    return {
      after: this.afterHook<ReportData>,
      build: this.buildHook,
    };
  }

  public build() {
    return {
      build: this.buildHook,
    };
  }
}
