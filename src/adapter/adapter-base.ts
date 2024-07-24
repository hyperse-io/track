import _ from 'lodash';
import { pipe } from '@hyperse/pipeline';
import { AdapterTransformResult } from '../types/types-adapter.js';

/**
 * BaseAdapter is an abstract class that provides a base implementation for a track adapter.
 * It defines the common methods and lifecycle hooks that can be overridden by subclasses.
 */
export abstract class BaseAdapter<T, V> {
  /**
   * Transforms the given context and options into a result.
   * This method should be implemented by subclasses.
   *
   * @param ctx - The context object.
   * @param options - The options object.
   * @returns A promise that resolves to the transformed result.
   */
  abstract transform(
    ctx: T,
    options: V
  ): AdapterTransformResult | Promise<AdapterTransformResult>;

  /**
   * Reports the result of the track operation.
   * This method should be implemented by subclasses.
   *
   * @param result - The result to be reported.
   */
  abstract report(result: Awaited<ReturnType<typeof this.transform>>): void;

  /**
   * Initializes the adapter with the given context.
   *
   * @param ctx - The context object.
   */
  init(ctx: T): void {}

  /**
   * Performs any necessary operations before the track operation.
   *
   * @param ctx - The context object.
   * @param options - The options object.
   */
  before(ctx: T, options: V): void {}

  /**
   * Checks if the adapter is trackable.
   *
   * @returns A boolean indicating whether the adapter is trackable.
   */
  isTrackable(): boolean {
    return true;
  }

  /**
   * Performs any necessary operations after the track operation.
   *
   * @param ctx - The context object.
   * @param result - The result of the track operation.
   */
  after(ctx: T, result: Awaited<ReturnType<typeof this.transform>>): void {}

  private executeTransform = async (
    ctx: T,
    options: V
  ): Promise<Awaited<ReturnType<typeof this.transform>>> => {
    return await pipe(() => this.transform(ctx, options))();
  };

  private executeReport = async (
    result: Awaited<ReturnType<typeof this.transform>>
  ): Promise<void> => {
    await pipe(() => this.report(result))();
  };

  /**
   * Tracks the given context and options.
   *
   * @param ctx - The context object.
   * @param options - The options object.
   */
  async track(ctx: T, options: V) {
    await pipe(
      () => this.init(ctx),
      () => this.before(ctx, options),
      () => this.executeTransform(ctx, options),
      async (result) => {
        await this.executeReport(result);
        return result;
      },
      (result) => this.after(ctx, result)
    )();
  }
}
