import { build } from '../mod.ts'

const contents = `
request*: Request
pathname*: string
match: MatchHandler<M>
data: DataHandler<M, D>
component: ComponentHandler<M>
`

const x = await build(contents, { className: 'Leaf', importsFrom: './types.ts' })
console.log(x)

// deno run -A ./example/build.ts > example/leaf.ts