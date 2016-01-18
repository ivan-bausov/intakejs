/// <reference path="./typings/tsd.d.ts" />

var gulp        = require('gulp'),
    ts          = require('gulp-typescript'),
    merge       = require('merge-stream'),
    sourcemaps  = require('gulp-sourcemaps'),
    git         = require('gulp-git'),
    bump        = require('gulp-bump'),
    tag_version = require('gulp-tag-version'),
    filter      = require('gulp-filter'),
    mocha       = require('gulp-mocha'),
    del         = require('del'),
    runSequence = require('run-sequence'),
    tsd         = require('gulp-tsd'),
    nodemon     = require('gulp-nodemon'),
    shell       = require('gulp-shell'),
    jasmine     = require('gulp-jasmine'),
    istanbul    = require('gulp-istanbul'),
    concat    = require('gulp-concat'),
    uglify    = require('gulp-uglify'),
    rjs = require("gulp-requirejs");

require('git-guppy')(gulp);

var PATHS = {
  src: 'lib',
  build: 'build',
  test: 'test',
  typings: 'typings'
};

var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });
var tsProjectAmd = ts.createProject('tsconfig_amd.json', { sortOutput: true });

/**
  * Git Hooks
  */
gulp.task('pre-commit', ['add']);

gulp.task('add', ['default'], function(){
  return gulp.src('.')
    .pipe(git.add({options: '-A'}));
});

/**
 * Defintions files
 */
gulp.task('definitions', shell.task([
  'node scripts/dts-bundle.js'
]));

/**
 * Dev tasks
 */
gulp.task('tsd:install', function (callback) {
  tsd({
    command: 'reinstall',
    config: './tsd.json'
  }, callback);
});
gulp.task('tsd', ['tsd:install'], shell.task([
  'tsd link'
]));

gulp.task('clean:tsd', function (cb) {
  del([
    PATHS.typings
  ], cb);
});

gulp.task('scripts:dev', function() {
  var tsResult = gulp.src([
      PATHS.src + '/**/*.ts',
      PATHS.test + '/**/*.ts'
    ], { base: "./" })
      .pipe(sourcemaps.init())
      .pipe(ts(tsProject));

  return merge([
    tsResult.js
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('.'))
  ]);
});

gulp.task('scripts:rjs', ['scripts:amd'], function () {
  return merge [
    rjs({baseUrl: PATHS.build, name:'intake', out: 'intake.amd.js'})
      .pipe(gulp.dest(PATHS.build))
    ];
});

gulp.task('scripts:amd', function() {
  var tsResult = gulp.src([
      PATHS.src + '/**/*.ts'
    ])
    .pipe(ts(tsProjectAmd));

  return merge([
      tsResult.js
        //.pipe(concat("intake.amd.min.js"))
        //.pipe(uglify())
        //.pipe(rjs({baseUrl: PATHS.build + '/intake.js'}))
        .pipe(gulp.dest(PATHS.build))
      //.pipe(rjs({baseUrl: PATHS.build + '/intake.js'}))
    ]);

});

gulp.task('scripts:dev:watch', ['scripts:dev'], function () {
  gulp.watch([
    PATHS.src + '/**/*.ts',
    PATHS.test + '/**/*.ts',
    PATHS.examples + '/**/*.ts'
  ], ['scripts:dev']);
});

gulp.task('clean:dev', function (cb) {
  del([
    PATHS.src + '/**/*.js',
    PATHS.test + '/**/*.js'
  ], cb);
});

/**
 * Tests tasks
 */
gulp.task('test', ['scripts:dev'], function (cb) {
  gulp.src([
    PATHS.src + '/**/*.js',
    '!' + PATHS.src + '/polyfills/*'
  ])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(PATHS.test + '/**/*.js')
        .pipe(jasmine())
        .pipe(istanbul.writeReports()) // Creating the reports after tests ran
        .on('end', cb);
    });
});

gulp.task('test:watch', ['test'], function() {
    gulp.watch([
      PATHS.src + '/**/*.ts',
      PATHS.test + '/**/*.ts'
    ], ['test']);
});

/**
 * Prod
 */
gulp.task('scripts:prod', function() {
  var tsResult = gulp.src([
      PATHS.src + '/**/*.ts'
    ])
      .pipe(sourcemaps.init())
      .pipe(ts(tsProject));

  return merge([
    tsResult.dts.pipe(gulp.dest(PATHS.build)),
    tsResult.js
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(PATHS.build))
  ]);
});

gulp.task('clean:prod', function (cb) {
  del([
    PATHS.build
  ], cb);
});

/**
 * Cleaning
 */
gulp.task('clean', ['clean:dev', 'clean:prod', 'clean:tsd']);

/**
 * Default
 */
gulp.task('default', function (cb) {
  runSequence(
    'ci',
    'scripts:rjs',
    'scripts:prod',
    'definitions',
    cb
  );
});

/**
 * CI
 */
gulp.task('ci', function (cb) {
  runSequence(
    'clean',
    'tsd',
    'test',
    cb
  );
});

/**
 * Bumping version
 */
function inc(importance) {
  return gulp.src(['./package.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('Bumps for new ' + importance + ' release.'))
    .pipe(filter('package.json'))
    .pipe(tag_version());
}

gulp.task('patch', function() { return inc('patch'); });
gulp.task('feature', function() { return inc('minor'); });
gulp.task('release', function() { return inc('major'); });
