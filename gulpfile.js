const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const nodemon = require('gulp-nodemon');
const jasmineNode = require('gulp-jasmine-node');

gulp.task('Create JSdoc', (cb) => {
    gulp.src(['README.md', './src/**/*.js'], { read: false })
        .pipe(jsdoc(cb));
});

gulp.task('Start API Server (including autorestart)', () => {
    nodemon({
        script: './src/services/api.js',
        ext: 'js html',
        env: { NODE_ENV: 'development' },
    });
});


gulp.task('Run Backend Jasmine Unittests', () => {
    console.log('Make sure backend server is NOT running!');
    const filesForTest = ['spec/**/*_spec.js'];
    return gulp.src(filesForTest).pipe(jasmineNode({
        timeout: 10000,
        includeStackTrace: false,
        color: true,
        port: 3000,
    }));
});
