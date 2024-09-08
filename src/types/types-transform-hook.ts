import { UnionToTuple } from './type-union-tuple.js';
import {
  TransformEventData,
  TransformEventType,
  TransformReturns,
} from './types-adapter.js';
import { TrackContext } from './types-create.js';
import { TrackEventDataBase } from './types-track.js';

/**
 * Represents the return type of the TransformHookReturns function.
 *
 * @template OtherChainer - The type of the other chainer.
 * @template Context - The type of the context.
 * @template Key - The type of the key.
 * @template LeftEventData - The type of the left event data.
 * @template RealEventData - The type of the real event data.
 */
export type TransformHookReturns<
  OtherChainer,
  Context,
  Key,
  LeftEventData,
  RealEventData,
> = <
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
) => UnionToTuple<
  Exclude<
    keyof RightEventData,
    TransformEventType<RightKey, RealEventData, RightEventData>
  >
>['length'] extends 0
  ? OtherChainer
  : OtherChainer & {
      transform: TransformHookReturns<
        OtherChainer,
        Context,
        RightKey,
        RightEventData,
        RealEventData
      >;
    };

/**
 * Represents a transform hook function.
 *
 * @template OtherChainer - The type of the other chainer.
 * @template Context - The type of the track context.
 * @template EventData - The type of the track event data.
 * @template RealEventData - The type of the real event data.
 */
export type TransformHook<
  OtherChainer,
  Context extends TrackContext<any>,
  EventData extends TrackEventDataBase,
  RealEventData extends TrackEventDataBase = EventData,
> = <
  Key extends keyof LeftEventData | [keyof LeftEventData, keyof RealEventData],
  LeftEventData = EventData,
>(
  eventType: Key,
  fun: (
    ctx: Context,
    eventType: TransformEventType<Key, RealEventData, LeftEventData>,
    eventData: TransformEventData<Key, RealEventData, LeftEventData>
  ) => TransformReturns<Key, RealEventData, LeftEventData>
) => UnionToTuple<
  Exclude<
    keyof LeftEventData,
    TransformEventType<Key, RealEventData, LeftEventData>
  >
>['length'] extends 0
  ? OtherChainer
  : OtherChainer & {
      transform: TransformHookReturns<
        OtherChainer,
        Context,
        Key,
        EventData,
        RealEventData
      >;
    };
