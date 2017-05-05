# Instant

A minimal prototype of an instant code editor. It runs JS code as you type.

## Demo

Try it out: https://cdn.rawgit.com/fwouts/instant/demo-v2/

## Underlying technologies

The code is actually quite simple. It's based on:
- [Ace](https://ace.c9.io/) for the code editor
- [React](https://facebook.github.io/react/) for the UI
- [Redux](https://github.com/reactjs/react-redux) for the state
- [Web Workers](http://stackoverflow.com/a/24660713/911298) for running the code

## Note on security

This is *not* designed to be a secure coding environment. The code you type is
run inside a Web Worker, but breaking out of the sandbox or at least creating
unexpected behaviour is totally doable (e.g. by calling `postMessage`).
