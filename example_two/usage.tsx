import { Example } from "./example.ts"

const x = new Example()
  .stringOrNumber(1)
  .toObject((knowsItsANumber) => {
    return { yepStillKnows: knowsItsANumber }
  })
  .chainMe(({ yepStillKnows }) => {
    return (yepStillKnows + 1).toString()
  })
  .done (nowAString => {
    console.log(nowAString) // string
  })

console.log(x)