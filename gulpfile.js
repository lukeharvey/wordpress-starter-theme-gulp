/**
 * Gulpfile.js by Luke Harvey
 */

'use strict';

/**
 * Include Gulp & tools we'll use
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});

var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

var config = {
  // make sure to change this URL so that Browsersync works
  url: 'example.dev'
};

/**
 * Help
 *
 * List the available gulp tasks
 */

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/**
 * Sass
 *
 * Complie and minify the Sass files and auto-inject into browsers
 */

gulp.task('sass', function() {
  return gulp.src(['./src/sass/main.scss'])
    .pipe($.sourcemaps.init())
      .pipe($.sass({
        precision: 10
      })
      .on('error', $.sass.logError))
      .pipe($.autoprefixer({browsers: ['last 2 versions']}))
      .pipe($.cssnano())
      .pipe($.rename('main.min.css'))
      .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

/**
 * Lint Sass
 *
 * Lint the Sass files using Stylelint
 */

gulp.task('lint-sass', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe($.stylelint({
      reporters: [{formatter: 'string', console: true}],
      syntax: "scss"
    }));
});

/**
 * JS Head
 *
 * Process the Javascript files for inclusion in the <head>
 */

gulp.task('js-head', function() {
  return gulp.src(['./src/js/head/vendor/*.js', './src/js/head/modules/*.js'])
    .pipe($.sourcemaps.init())
      .pipe($.concat('head.min.js'))
      .pipe($.uglify({output: {comments: 'some'}}))
      .pipe($.size({title: 'scripts'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js/'));
});

/**
 * JS Main
 *
 * Process the main Javascript files
 */

gulp.task('js-main', function() {
  return gulp.src(['./src/js/main/vendor/*.js', './src/js/main/modules/*.js'])
    .pipe($.sourcemaps.init())
      .pipe($.concat('main.min.js'))
      .pipe($.uglify({output: {comments: 'some'}}))
      .pipe($.size({title: 'scripts'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js/'));
});

/**
 * Lint JS
 *
 * Lint the JavaScript files using ESLint
 */

gulp.task('lint-js', function() {
  return gulp.src(['./src/js/head/modules/*.js', './src/js/main/modules/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

/**
 * Lint everything
 */

gulp.task('lint', function(done) {
  return runSequence('lint-sass', 'lint-js', done);
});

/**
 * Clean
 *
 * Clean the dist assets folder
 */

gulp.task('clean', function () {
  return gulp.src('dist/*', {read: false})
    .pipe($.clean());
});

/**
 * Build
 *
 * Build everything
 */

gulp.task('build', function(done) {
  return runSequence('clean', ['sass', 'js-head', 'js-main'], done);
});

/**
 * Serve
 *
 * Run a Browsersync server and watch all the files.
 */

gulp.task('serve', function() {

  return runSequence('clean', ['sass', 'js-head', 'js-main'], function() {
    browserSync.init({
      open: false,
      proxy: config.url
    });

    gulp.watch(['./src/sass/**/*.scss'], ['sass']);
    gulp.watch(['./src/js/head/**/*.js'], ['js-head', browserSync.reload]);
    gulp.watch(['./src/js/main/**/*.js'], ['js-main', browserSync.reload]);
    gulp.watch(['./**/*.php']).on('change', browserSync.reload);
  });
});
