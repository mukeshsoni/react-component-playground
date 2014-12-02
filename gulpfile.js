/* gulpfile.js */

var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var reactify = require('reactify');
var cssify = require('cssify');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');
var concatCss = require('gulp-concat-css');

var paths = {
  css: ['src/css/**/*.css'],
  app_js: ['./src/js/app.jsx'],
  js: ['src/js/**/*.jsx'],
};

gulp.task('clean', function(done) {
  del(['dist'], done);
});

gulp.task('cleanCss', function(done) {
  del(['dist/css'], done);
});

gulp.task('cleanJs', function(done) {
  del(['dist/js'], done);
});

gulp.task('css', ['cleanCss'], function() {
  return gulp.src(paths.css)
    // .pipe(stylus())
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload());
});

gulp.task('js', ['cleanJs'], function() {
  // Browserify/bundle the JS.
  browserify({
      entries: paths.app_js,
      transform: [cssify, reactify],
      debug: true
    })
  // browserify(paths.app_js)
    // .transform(cssify)
    // .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(livereload());
});

gulp.task('buildAll', ['css', 'js'], function() {});

gulp.task('watch', function() {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.js, ['js']);

  // don't need to build the whole thing just for reloading index.html
  gulp.watch('index.html', function() {
    gulp.src('dist/js/bundle.js').pipe(livereload());
  });
});


gulp.task('default', ['watch', 'buildAll']);