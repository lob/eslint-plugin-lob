# eslint-plugin-lob

[![Build Status](https://travis-ci.org/lob/eslint-plugin-lob.svg?branch=master)](https://travis-ci.org/lob/eslint-plugin-lob)
[![Coverage Status](https://coveralls.io/repos/github/lob/eslint-plugin-lob/badge.svg?branch=master)](https://coveralls.io/github/lob/eslint-plugin-lob?branch=master)

Custom ESLint rules for Lob repositories

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint -D
```

Next, install `eslint-plugin-lob`:

```
$ npm install eslint-plugin-lob -D
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-lob` globally.

## Usage

Add `lob` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "lob"
  ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "lob/rule-name": 2
  }
}
```

## Supported Rules

* `align-equals` - equal signs of variable declarations involving `require` or `Factory.build` must be aligned
* `newline-after-mocha` - new lines must be between mocha blocks (`describe`, `it`, `beforeEach`, etc)
* `padded-describes` - `describe` blocks must be padded by blank lines

## Testing

To run the test suite, just clone the repository and run the following:

```bash
$ npm i
$ npm test
```

## Contributing

To contribute, please see the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is released under the MIT license, which can be found in [`LICENSE.txt`](LICENSE.txt).
