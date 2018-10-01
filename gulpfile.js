const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const nodemon = require('gulp-nodemon');
var jasmineNode = require('gulp-jasmine-node');
var watch = require('gulp-watch');

gulp.task('default', (cb) => {
  gulp.src(['README.md', './src/**/*.js'], { read: false })
    .pipe(jsdoc(cb));
});

gulp.task('start server', () => {
    nodemon({
        script: './src/services/api.js',
        ext: 'js html',
        env: { NODE_ENV: 'development' },
    });
});


gulp.task('jasmine', function () {
    var filesForTest = ['spec/**/*_spec.js'];
    return gulp.src(filesForTest).pipe(jasmineNode({
        timeout: 10000,
        includeStackTrace: false,
        color: false
    }));
});

