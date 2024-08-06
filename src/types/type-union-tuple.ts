export type UnionToIntersection<U> = (
  U extends any ? (a: (k: U) => void) => void : never
) extends (a: infer I) => void
  ? I
  : never;

export type UnionLast<U> =
  UnionToIntersection<U> extends (a: infer I) => void ? I : never;

export type UnionToTuple<U> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, UnionLast<U>>>, UnionLast<U>];
