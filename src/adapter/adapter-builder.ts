import { TrackAdapter } from '../types/types-adapter.js';

/**
 * Builder class for creating an adapter with various configuration options.
 *
 * @template T - The type of the context object.
 * @template V - The type of the eventData object.
 */
export class AdapterBuilder<T, V> {
  private adapter: TrackAdapter<T, V>;

  constructor(_adapter: TrackAdapter<T, V>) {
    this.adapter = _adapter;
  }

  private initHook = (fun: (context: T) => void) => {
    this.adapter.init(fun);
    return this.before();
  };

  private beforeHook = (fun: (context: T) => void) => {
    this.adapter.before(fun);
    return this.after();
  };

  private afterHook = (fun: (context: T) => void) => {
    this.adapter.after(fun);
    return this.isTrackable();
  };

  private isTrackableHook = (trackable: boolean | (() => boolean)) => {
    this.adapter.setTrackable(trackable);
    return this.transform();
  };

  private transformHook = <R>(
    fun: (context: T, eventType: keyof V, eventData: V) => R
  ) => {
    this.adapter.transform<R>(fun);
    return this.report<R>();
  };

  private reportHook = <R>(fun: (context: T, eventData: R) => void) => {
    this.adapter.report(fun);
    return this.build();
  };

  private buildHook = () => {
    return this.adapter;
  };

  public initBuilder() {
    return {
      init: this.initHook,
    };
  }

  public before() {
    return {
      before: this.beforeHook,
      after: this.afterHook,
      isTrackable: this.isTrackableHook,
      transform: this.transformHook,
      report: this.reportHook<V>,
    };
  }

  public after() {
    return {
      after: this.afterHook,
      isTrackable: this.isTrackableHook,
      transform: this.transformHook,
      report: this.reportHook<V>,
    };
  }

  public isTrackable() {
    return {
      isTrackable: this.isTrackableHook,
      transform: this.transformHook,
      report: this.reportHook<V>,
    };
  }

  public transform() {
    return {
      transform: this.transformHook,
      report: this.reportHook<V>,
      build: this.buildHook,
    };
  }

  public report<R>() {
    return {
      report: this.reportHook<R>,
      build: this.buildHook,
    };
  }

  public build() {
    return {
      build: this.buildHook,
    };
  }
}
