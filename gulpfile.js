const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const nodemon = require('gulp-nodemon');
// const bootstrap = require('bootstrap');

gulp.task('default', (cb) => {
  gulp.src(['README.md', './src/**/*.js'], { read: false })
    .pipe(jsdoc(cb));
});

gulp.task('start server', () => {
  nodemon({
    script: './src/services/entries.js',
    ext: 'js html',
    env: { NODE_ENV: 'development' },
  });
});
