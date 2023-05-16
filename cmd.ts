import { build } from './mod.ts'
import path from "https://deno.land/std@0.152.0/node/path.ts";

const lbcFile = Deno.args[0]
if (!lbcFile) throw new Error('no file provided')
const pathArg = path.isAbsolute(lbcFile) ? lbcFile : path.join(Deno.cwd(), lbcFile) 
const file = await Deno.readTextFile(pathArg)
const className = path.basename(pathArg, path.extname(pathArg))
const output = await build(file, { className })
console.log(output)