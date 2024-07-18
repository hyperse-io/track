export type TrackContextFunction<T> = (ctx: T) => T | Promise<T>;

export type TrackTransformFunction<T, V> = (ctx: T, args: V) => V | Promise<V>;


export type TrackFunctionVoid<T> = (args: T) => void | Promise<void>;

export type TrackContext {}

export type TrackOptions=string | number | boolean | Symbol | Record<string,unknown> | Array<unknown>