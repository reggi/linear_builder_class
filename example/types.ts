/** @jsx h */
import { JSX, VNode} from "https://esm.sh/preact@10.13.2";

export type MatchHandler<T> = (req: Request, ctx: CTX) =>  null | T | Promise<T>
export type DataHandler<I, O> = (requestData: NonNullable<Awaited<I>>) => O
export type ComponentHandler<T> = (props: NonNullable<Awaited<T>>) => JSX.Element | VNode

type CTX = {
  pathname: string;
  url: URL;
}
