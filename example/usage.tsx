/** @jsx h */
import { h } from "https://esm.sh/preact@10.13.2";
import { Leaf } from './leaf.ts'

const leaf = new Leaf()
  .request(new Request('https://example.com'))  
  .pathname('/hello-world')
  .match(async (_req, ctx) => {
    const match = new URLPattern({ pathname: ctx.pathname }).exec(ctx.url.pathname)
    const age = ctx.url.searchParams.get('age')
    if (!match) return null
    if (!age) throw new Error('missing age param')
    const x = await Promise.resolve({ age })
    return x
  })
  .data(async data => {
    const x = await Promise.resolve({ ...data })
    return { age: parseInt(x.age)}
  })
  .component(props => {
    return <div>{props.age}</div>
  })

console.log(leaf)