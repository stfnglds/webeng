const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const nodemon = require('gulp-nodemon');
const jasmineNode = require('gulp-jasmine-node');

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


gulp.task('jasmine', () => {
    const filesForTest = ['spec/**/*_spec.js'];
    return gulp.src(filesForTest).pipe(jasmineNode({
        timeout: 10000,
        includeStackTrace: false,
        color: false,
        port: 3001,
    }));
});
