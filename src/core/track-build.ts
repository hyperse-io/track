import { pipe } from '@hyperse/pipeline';
import { logger } from '../logger/create-logger.js';
import {
  TrackAdapterMap,
  TrackEventDataBase,
  TrackSelectOptions,
} from '../types/types-track.js';
import { type Track } from './track.js';

/**
 * Represents a builder for creating and configuring a Track instance.
 * @template T The type of the context object.
 * @template V The type of the track event value.
 */
export class TrackBuilder<T, V extends TrackEventDataBase> {
  private trackInstance: Track<T, V>;

  constructor(_track: Track<T, V>) {
    this.trackInstance = _track;
  }

  private beforeHook = (fun: (context: T) => void | Promise<void>) => {
    this.trackInstance.before(fun);
    return this.after();
  };

  private afterHook = (fun: (context: T) => void | Promise<void>) => {
    this.trackInstance.after(fun);
    return this.transform();
  };

  private transformHook = (
    fun: (context: T, eventData: V) => V | Promise<V>
  ) => {
    this.trackInstance.transform(fun);
    return this.useAdapter();
  };

  private useAdapterHook = <R extends TrackAdapterMap<T, V>>(fun: () => R) => {
    const adapterMap = fun();
    this.trackInstance.useAdapter(adapterMap);
    return this.select<keyof typeof adapterMap>();
  };

  private selectHook = <N>(names?: TrackSelectOptions<T, V, N>) => {
    this.trackInstance.select<N>(names);
    return this.track();
  };

  private trackHook = async (eventType: keyof V, eventData: V) => {
    try {
      await pipe(
        async () => await this.trackInstance.executeBefore(),
        async () => await this.trackInstance.executeSelect(),
        async () => await this.trackInstance.executeTransform(eventData),
        async (result) =>
          await this.trackInstance.executeTrackAdapter(eventType, result),
        async () => await this.trackInstance.executeAfter()
      )();
    } catch (error) {
      logger.error(`Failed to track event: ${error}`);
    }
    return this.build();
  };

  private buildHook = async () => {
    return this.track;
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

  public select = <N>() => {
    return {
      select: this.selectHook<N>,
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

  public build = () => {
    return {
      build: this.buildHook,
    };
  };
}
