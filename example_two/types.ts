export type StringOrNumber<A> = A
export type ToObject<A, B> = (arg: A) => B
export type ChainMe<B, C> = (arg: B) => C
export type Done<C> = (arg: C) => void