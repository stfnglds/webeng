const gulp = require('gulp');

const compodoc = require('@compodoc/gulp-compodoc');

gulp.task('Create CompoDoc', () => gulp.src('src/**/*.ts')
    .pipe(compodoc({
      output: 'documentation',
      tsconfig: 'src/tsconfig.json',
      serve: true,
    })));
