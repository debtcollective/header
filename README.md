[![Build Status](https://travis-ci.org/debtcollective/header.svg?branch=master)](https://travis-ci.org/debtcollective/header)
[![codecov](https://codecov.io/gh/debtcollective/header/branch/master/graph/badge.svg)](https://codecov.io/gh/debtcollective/header)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

## Installation

```bash
yarn add @debtcollective/header
```

## Usage

```js
import React, { Component } from 'react'
import Header from @debtcollective/header

class Example extends Component {
  render () {
    return (
      <Header />
    )
  }
}
```

## Dependencies

Check **package.json** `peerDependencies`.

## Development

In the project directory, the principal commands you may want to know are:

### `yarn start`

Runs Rollup in watch mode

### `yarn build`

Builds the package using Rollup

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn docz dev`

Launches a server with components documentation.

## Example app

To run the example run:

```bash
cd example
yarn install
yarn start
```

This app is based on [create-react-app](https://github.com/facebookincubator/create-react-app), serving 2 purposes

- Local, hot-reload server for developing your module
- Easily publishable to github pages

## Coding guideline

- We use semantic commits throught https://commitizen.github.io/cz-cli/
- While Material UI support `withStyles` we prefer the usage of https://www.styled-components.com to do so, often needing to apply extra specificity to allow styles to being applied
- Some UI pieces from Material UI needs unique identifiers, so we use constants in the same file but with a format to avoid conflicts like so: `const <ELEMENT_TYPE>_NAME = "@@<scope>/<component>/<element_type>";`

## License

BSD-3-Clause © [@debtcollective](https://github.com/debtcollective)
