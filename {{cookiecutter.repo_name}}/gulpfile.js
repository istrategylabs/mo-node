'use strict';

const fs             = require('fs');
const path           = require('path');
const gulp           = require('gulp');
const gutil          = require('gulp-util');
const del            = require('del');
const browserSync    = require('browser-sync').create();
const autoprefixer   = require('autoprefixer');
const postcss        = require('gulp-postcss');
const sass           = require('gulp-sass');
const sourcemaps     = require('gulp-sourcemaps');
const source         = require('vinyl-source-stream');
const buffer         = require('vinyl-buffer');
const browserify     = require('browserify');
const rev            = require('gulp-rev');
const revReplace     = require('gulp-rev-replace');
const uglify         = require('gulp-uglify');
const cssnano        = require('gulp-cssnano');
const htmlmin        = require('gulp-htmlmin');
const gulpif         = require('gulp-if');
const critical       = require('critical').stream;
const runSequence    = require('run-sequence');


function bundle(options) {
  options = options || {};
  const bundlerOpts = { entry: true, debug: true };
  let bundler = browserify(
    'src/js/app.js', bundlerOpts
    )
    .transform('babelify', { presets: ['es2015'] });

  function rebundle() {
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.message));
        this.emit('end');
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('public/js/'));
  }

  if (options.watch) {
    const watchify = require('watchify');
    bundler = watchify(bundler);
    bundler.on('update', () => {
      gutil.log('-> bundling...');
      rebundle();
    });
  }

  return rebundle();
}

gulp.task('browserify', () => {
  return bundle();
});

gulp.task('watchify', () => {
  return bundle({ watch: true });
});

gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(
      {
        includePaths: [path.join(path.dirname(require.resolve('foundation-sites')), '../scss')]
      }
    )
    .on('error', sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css/'));
});

gulp.task('extras', () => {
  return gulp.src('src/**/*.{txt,json,xml,jpeg,jpg,png,gif,svg,ttf,otf,eot,woff,woff2}')
    .pipe(gulp.dest('public/'));
});

gulp.task('watch', ['sass', 'extras', 'watchify'], () => {
  browserSync.init({
    server: 'public',
    files: 'public/**/*'
  });

  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/**/*.{txt,json,xml,jpeg,jpg,png,gif,svg,ttf,otf,eot,woff,woff2}', ['extras']);
});

gulp.task('rev', ['build'], () => {
  return gulp.src(['public/**/*', '!**/*.html'], { base: 'public' })
    .pipe(rev())
    .pipe(gulp.dest('public/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/'));
});

gulp.task('rev:replace', ['rev'], () => {
  const manifest = gulp.src('public/rev-manifest.json');
  return gulp.src('public/**/*')
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest('public/'));
});

gulp.task('minify', ['rev:replace', 'critical'], () => {
  return gulp.src(['public/**/*'], { base: 'public/' })
    // Only target the versioned files with the hash
    // Those files have a - and a 10 character string
    .pipe(gulpif(/-\w{10}\.js$/, uglify({
      preserveComments: 'license',
      compressor: {
        screw_ie8: true
      },
      output: {
        preamble: (function() {
          var banner = fs.readFileSync('banner.txt', 'utf8');
          banner = banner.replace('@date', (new Date()));
          return banner;
        }())
      }
    })))
    .pipe(gulpif(/-\w{10}\.css$/, cssnano()))
    .pipe(gulpif('*.html', htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(gulp.dest('public/'));
});

gulp.task('critical', ['rev:replace'], function() {
  return gulp.src('public/**/*.html')
  .pipe(critical({
    base: 'public/',
    inline: true,
    minify: true
  }))
  .pipe(gulp.dest('public/'));
});

gulp.task('clean', () => {
  return del(['public/*', '!public/favicon.ico', '!public/favicon-152.png']);
});

gulp.task('build', (done) => {
  runSequence(
    'clean',
    ['browserify', 'sass', 'extras'],
    done
  );
});

gulp.task('build:production', (done) => {
  runSequence(
    'build',
    ['rev:replace', 'minify', 'critical'],
    done
  );
});

gulp.task('start', (done) => {
  runSequence(
    'build',
    'watch',
    done
  );
});

gulp.task('default', ['build']);
