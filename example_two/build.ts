import { build } from '../main.ts'

const contents = `
stringOrNumber: StringOrNumber<A>
toObject: ToObject<A, B>
chainMe: ChainMe<B, C>
done: Done<C>
`

const x = await build(contents, { className: 'Example', importsFrom: './types.ts' })
console.log(x)

// deno run -A ./example_two/build.ts > example_two/example.ts