/**
 * Gulpfile.js by Luke Harvey
 */

"use strict";

/**
 * Include Gulp & tools we'll use
 */

var gulp = require("gulp");
var $ = require("gulp-load-plugins")({ lazy: true });

var runSequence = require("run-sequence");
var browserSync = require("browser-sync").create();
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");

var config = {
  // make sure to change this url so that Browsersync works
  url: "example.test"
};

/**
 * List the available gulp tasks
 */

gulp.task("help", $.taskListing);
gulp.task("default", ["help"]);

/**
 * Sass
 *
 * Complie and minify the Sass files and auto-inject into browsers
 */

gulp.task("sass", function() {
  var plugins = [autoprefixer({ browsers: ["last 2 versions"] }), cssnano()];
  return gulp
    .src(["./src/sass/main.scss"])
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass({
        precision: 10
      }).on("error", $.sass.logError)
    )
    .pipe($.postcss(plugins))
    .pipe($.rename("main.min.css"))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css/"))
    .pipe(browserSync.stream({ match: "**/*.css" }));
});

/**
 * Lint Sass
 *
 * Lint the Sass files using Stylelint
 */

gulp.task("lint-sass", function() {
  return gulp.src("./src/sass/**/*.scss").pipe(
    $.stylelint({
      reporters: [{ formatter: "string", console: true }],
      syntax: "scss"
    })
  );
});

/**
 * JS
 *
 * Process the JavaScript files
 */

gulp.task("js-modules", function() {
  return gulp
    .src(["./src/js/modules/*.js"])
    .pipe($.sourcemaps.init())
    .pipe($.concat("modules.min.js"))
    .pipe($.uglify({ output: { comments: "some" } }))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js/"));
});

gulp.task("js-vendor", function() {
  return gulp
    .src(["./src/js/vendor/*.js"])
    .pipe($.sourcemaps.init())
    .pipe($.concat("vendor.min.js"))
    .pipe($.uglify({ output: { comments: "some" } }))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js/"));
});

/**
 * Lint JS (modules only)
 *
 * Lint the JavaScript files using ESLint
 */

gulp.task("lint-js", function() {
  return gulp
    .src(["./src/js/modules/*.js"])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

/**
 * Lint everything
 */

gulp.task("lint", function(done) {
  return runSequence("lint-sass", "lint-js", done);
});

/**
 * Clean
 *
 * Clean the dist assets folder
 */

gulp.task("clean", function() {
  return gulp.src("dist/*", { read: false }).pipe($.clean());
});

/**
 * Build
 *
 * Build everything
 */

gulp.task("build", function(done) {
  return runSequence("clean", ["sass", "js-modules", "js-vendor"], done);
});

/**
 * Watch tasks
 */

gulp.task("js-modules-watch", ["js-modules"], browserSync.reload);
gulp.task("js-vendor-watch", ["js-vendor"], browserSync.reload);

/**
 * Serve
 *
 * Run a Browsersync server and watch all the files.
 */

gulp.task("serve", function() {
  return runSequence(["sass", "js-modules", "js-vendor"], function() {
    browserSync.init({
      injectChanges: true,
      open: false,
      proxy: config.url
    });

    gulp.watch(["./src/sass/**/*.scss"], ["sass"]);
    gulp.watch(
      ["./src/js/modules/*.js"],
      ["js-modules-watch", browserSync.reload]
    );
    gulp.watch(
      ["./src/js/vendor/*.js"],
      ["js-vendor-watch", browserSync.reload]
    );
    gulp.watch(["./**/*.php"]).on("change", browserSync.reload);
  });
});
