/**
 * Gulpfile.js for _lh theme by Luke Harvey
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
  // make sure to change this url so that Browsersync works
  url: 'example.dev'
};

/**
 * List the available gulp tasks
 */

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/**
 * Process the main Sass file and auto-inject into browsers
 */

gulp.task('sass', function() {
  log('Processing the main Sass file');

  return gulp.src(['./src/sass/main.scss'])
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 2 versions']}))
    .pipe($.cleanCss())
    .pipe($.rename('main.min.css'))
    .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

/**
 * Lint all Sass files
 */

gulp.task('lint-sass', function() {
  log('Linting all Sass files');

  return gulp.src('./src/sass/**/*.scss')
    .pipe($.scssLint());
});

/**
 * Process the Javascript files
 */

 gulp.task('js', function() {
   log('Processing JS');

   return gulp.src(['./src/js/vendor/*.js', './src/js/modules/*.js'])
     .pipe($.sourcemaps.init())
     .pipe($.babel())
     .pipe($.concat('main.min.js'))
     .pipe($.uglify({preserveComments: 'some'}))
     .pipe($.size({title: 'scripts'}))
     .pipe($.sourcemaps.write('.'))
     .pipe(gulp.dest('./dist/js/'));
 });

 /**
  * Lint the Javascript files
  */

 gulp.task('lint-js', function() {
   gulp.src(['./src/js/modules/*.js'])
     .pipe($.eslint())
     .pipe($.eslint.format())
     .pipe($.eslint.failAfterError())
     .pipe($.jscs())
     .pipe($.jscs.reporter('fail'));
 });

/**
 * Build everything
 */

gulp.task('build', function(done) {
  runSequence('sass', 'js', done);
});

gulp.task('serve', ['sass', 'js'], function() {

  browserSync.init({
    proxy: config.url
  });

  gulp.watch(['./src/sass/**/*.scss'], ['sass']);
  gulp.watch(['./src/js/**/*.js'], ['js', browserSync.reload]);
  gulp.watch(['./**/*.php']).on('change', browserSync.reload);

});

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */

var log = function(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
};
