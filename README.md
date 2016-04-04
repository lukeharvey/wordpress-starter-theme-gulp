lh
===

A WordPress starter theme by Luke Harvey.

Features:
- [sanitize.css](https://jonathantneal.github.io/sanitize.css/)
- [Gulp](http://gulpjs.com/) for asset optimisation and compilation
- [BrowserSync](http://www.browsersync.io/) for live browser reloading
- [Suit CSS](http://suitcss.github.io/) naming conventions

## Getting started

### Install pre-requisites

- [Node.js](http://nodejs.org/) `brew install node`
- Gulp `$ npm install -g gulp`

### Optional linters
- ESLint & babel-eslint `$ npm install -g eslint babel-eslint`
- JSCS `$ npm install -g jscs`
- SCSS-Lint `gem install scss_lint`

### Setup
```
$ git clone https://github.com/lukeharvey/lh.git
$ cd lh
$ npm install
```
Then edit the `gulpfile.js` to set the URL.

## Developing 'lh'
```
# Asset compilation
$ gulp build

# Start live reload server with automatic asset compilation
$ gulp serve

# List other available gulp tasks
$ gulp help
```

# Author

### Luke Harvey

A web developer / web designer from the UK.

- <https://lukeharvey.co.uk>
