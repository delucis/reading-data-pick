# @delucis/reading-data-pick

[![Build Status](https://travis-ci.org/delucis/reading-data-pick.svg?branch=master)](https://travis-ci.org/delucis/reading-data-pick)
[![Coverage Status](https://coveralls.io/repos/github/delucis/reading-data-pick/badge.svg?branch=master)](https://coveralls.io/github/delucis/reading-data-pick?branch=master)
[![npm (scoped)](https://img.shields.io/npm/v/@delucis/reading-data-pick.svg)](https://www.npmjs.com/package/@delucis/reading-data-pick)

A plugin for [`@delucis/reading-data`](https://github.com/delucis/reading-data)
that allows easy use of [`lodash.pick`][592bfd42].

  [592bfd42]: https://www.npmjs.com/package/lodash.pick "lodash.pick NPM package"


## Installation

```sh
npm install --save @delucis/reading-data-pick
```


## Usage

```js
const RD = require('@delucis/reading-data')
const PICK = require('@delucis/reading-data-pick')

RD.preloadData({
  myArticle: {
    text: 'This is a short article that is well worth reading.',
    meta: 'This is some superfluous metadata we’d rather not include'
  }
})

RD.use(PICK, {
  scope: 'myArticle',
  pick: 'text'
})

RD.run().then((res) => {
  console.log(res.data.myArticle)
  // logs: { text: 'This is a short article that is well worth reading.' }
})
```


## Options

name        | type               | default       | description
------------|--------------------|---------------|------------------------------
`hooks`     | `String`, `Object` | `'process'`   | The `reading-data` hook that on which the scope should be picked. Can be scoped by passing an object with scopes as keys, hooks as values.
`pick`      | `String`, `Array`  |               | The property/properties to be picked (i.e. included) from the original data.
`scope`     | `String`, `Array`  | `'pick'` | The scope under which `reading-data` will store this plugin’s data.
