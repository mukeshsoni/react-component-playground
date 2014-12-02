/* gulpfile.js */

var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');

var paths = {
  css: ['src/css/**/*.styl'],
  app_js: ['./src/js/app.jsx'],
  js: ['src/js/*.jsx'],
};

gulp.task('clean', function(done) {
  del(['build'], done);
});

gulp.task('js', ['clean'], function() {
  // Browserify/bundle the JS.
  browserify(paths.app_js)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  // gulp.watch(paths.css, ['css']);
  gulp.watch([paths.js, 'index.htmls'], ['js']);

  // don't need to build the whole thing just for reloading index.html
  gulp.watch('index.html', function() {
    gulp.src('dist/bundle.js').pipe(livereload());
  });
});

gulp.task('default', ['watch', 'js']);