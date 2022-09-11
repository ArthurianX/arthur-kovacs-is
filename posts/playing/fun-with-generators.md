---
title: "Fun things to do with generators"
date: '2022-09-11'
---
# Introduction ?

Largely ignored by developers, generators have been around in JavaScript since ES2015.
We can think of generators as special functions whose execution can be paused and resumed later on 

``` typescript
// NOTE: A generator is a type of iterator
//  has a `.next()` method returning { value, done }

someIterator.next()
// {value: 'something', done: false}
someIterator.next()
// {value: 'anotherThing', done: false}
someIterator.next()
// {value: undefined, done: true}
```

They are extremely powerful tools for producing and consuming series of data, that makes them perfect for implementing lazy sequences, custom iterables, animation and many other uses.

## Basics 

Generator functions return generator objects, `function*` defines a generator function

```typescript
function* genFunction() {
    yield "hello world!";
}

let genObject = genFunction();
// Generator { }
genObject.next();
// { value: "hello world!", done: false }
genObject.next();
// { value: undefined, done: true }
```

`.next()` advances, `yield` pauses, `return` stops

```typescript
function* loggerator() {
    console.log('running');
    yield 'paused';
    console.log('running again...');
    return 'stopped';
}

let logger = loggerator();
logger.next(); //running...
// { value: 'paused', done: false }
logger.next(); //running again...
// { value: 'stopped', done: true }
```

## Generators are not only _iterators_, they are also _iterable_!

We're going to get really confused about this, but hopefully at the end all'l make sense.

```typescript
function* abcs() {
    yield 'a';
    yield 'b';
    yield 'c';
}

for (let letter of abcs()) {
    console.log(letter.toUpperCase());
}
// A
// B
// C

[...abcs()] // ["a", "b", "c"]
```

## But what's a real use case ?

All is nice and dandy so far, but still the above doesn't offer us too much value.
However, generators can easily create custom complex iterable objects. 

Let's take this more dynamic example:
``` stackblitz-1
{"project":{"files":{"index.ts": "const cardDeck = {suits: ['♠', '♥', '♦', '♣'], court: ['J', 'Q', 'K', 'A'], [Symbol.iterator]: function* () {for (let suit of this.suits) {for (let i = 2; i <= 10; i++) yield suit + i;for (let c of this.court) yield suit + c;}},};console.log([...cardDeck]);"}},"options":{"openFile":"index.ts"}}
```
