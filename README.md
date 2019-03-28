[![Build Status](https://travis-ci.org/debtcollective/header.svg?branch=master)](https://travis-ci.org/debtcollective/header)
[![codecov](https://codecov.io/gh/debtcollective/header/branch/master/graph/badge.svg)](https://codecov.io/gh/debtcollective/header)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, the principal commands you may want to know are:

## Getting Started

Make sure to have the environment variables in order the project to work (even locally)

```
$ cp env.sample .env
```

## Main Scripts

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn docz dev`

Launches a server with components documentation sorted by scopes.

## Contributing

- We enforce the usage of semantic commits throught https://commitizen.github.io/cz-cli/
- The scope for semantic commits belongs to first level folder from `src/` unless changes are outside of `src` folder
- While Material UI support `withStyles` we prefer the usage of https://www.styled-components.com to do so, often needing to apply extra specificity to allow styles to being applied
- Some UI pieces from Material UI needs unique identifiers, so we use constants in the same file but with a format to avoid conflicts like so: `const <ELEMENT_TYPE>_NAME = "@@<scope>/<component>/<element_type>";`

## Learn More

Some information missing? Make sure to check out [Create React App local document](./CRA.md)

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
