import gulp from 'gulp';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';

let config = {
    testExpression: 'tests/*.js',
    paths: {
        compilePath: 'app',     
        lint: [ // code to lint
            'app/index.js',
            './gulpfile.babel.js',
            'app/sources/*.js',
            'app/templates/**/*.js'
        ],
        watch: [ // code that should be watched
            'app/index.js',
            './gulpfile.babel.js',
            'app/sources/*.js',
            'app/templates/**/*.js'
        ],
         test: 'tests/*.js'
    }
};

gulp.task('test', () => {
    return gulp.src([config.paths.test])
        .pipe(mocha())
         .pipe(mocha({reporter: 'nyan'}));
});


// will run watch & lint while you develop
gulp.task('watch', ['lint'], function () {
    gulp.watch(config.paths.watch, ['lint']);
});


// will run coding style checks
gulp.task('lint', ['test'], () => {
 return gulp
        .src(config.paths.lint)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('default', ['watch']);