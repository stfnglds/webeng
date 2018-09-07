const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
//const bootstrap = require('bootstrap');

gulp.task('default', (cb) => {
  gulp.src(['README.md', './src/**/*.js'], { read: false })
    .pipe(jsdoc(cb));
});