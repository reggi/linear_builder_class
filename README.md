## Linear Builder Class

My goal is to define types and ensure that the generic values "match" from one method to the next. 

```ts
new Example()
  .stringOrNumber(1)
  .toObject((knowsItsANumber) => {
    return { yepStillKnows: knowsItsANumber }
  })
  .chainMe(({ yepStillKnows }) => {
    return yepStillKnows + 1
  })
  .done (stillANumber => {
    console.log(stillANumber) // number
  })
```

> Note: this 👆 is `example_two`

One common approach to achieve this is to maintain separate class instances that are returned for each method, instead of returning this and having a regular class where all methods are on that one class. With the latter approach, each "set" value can't be dynamically typed. By passing in a value and returning a new class instance, you can keep track of the types. This is a linear process because you can only set one property at a time in the same sequence. Due to the way that generics work, the only way to do this effectivly is to create and return new class instances which can result in a lot of boilerplate code. That's where this tool comes in. This creates the scaffolding classes required to pull this off.

What is a [builder class](https://refactoring.guru/design-patterns/builder/typescript/example)? It's a pattern of class creation where class methods generally return `this`, and you chain methods together, internal class state manages changes, an example is something like `builder.getProduct().listParts()`. With this project, I was interested in creating generating the code for a class from a small definition. 

```
request*: Request
pathname*: string
match: MatchHandler<M>
data: DataHandler<M, D>
component: ComponentHandler<M>
```

> Note: the `*` syntax means the type is a "native" type and it shouldn't be included when using the `importsFrom` option.

Builds a class with these methods:

```ts
new Leaf()
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
```

Where the return value is a class with these properties.

```
{
  request: Request
  pathname: string,
  match: MatchHandler<M>,
  data: DataHandler<M, D>,
  component: ComponentHandler<M>,
}
```

This example was created using Deno, you can build the code using:

```
deno run -A ./example/build.ts > example/leaf.ts
```

and run the usage using:

```
deno run example/usage.tsx
```