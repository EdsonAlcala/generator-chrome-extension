import gulp from 'gulp';
import eslint from 'gulp-eslint';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import path from 'path';

let root = 'src';

// helper method for resolving paths
let resolveToApp = (glob = '') => {
    return path.join(root, glob);
};

// map of all paths
let paths = {
    //scss: resolveToApp('**/*.scss'),
    //js: resolveToApp('**/*.js'),
    html: [
        resolveToApp('**/*.html'),
        path.join(root, 'index.html')
    ],
    dest: path.join(__dirname, 'tmp'),
    lint: [
        'gulpfile.babel.js',
        resolveToApp('**/*.js')
    ]
};

// will run coding style checks
gulp.task('lint', () => {
  return gulp
    .src(paths.lint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('build', [
  'build-js',
  'copy-images',
  'copy-pages',
  'copy-styles',
  'copy-fonts',
  'copy-files'
]);

gulp.task('build-js', () => {
  return gulp.src('./js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    //.pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('copy-images', () => {
  return gulp.src('./img/*')
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('copy-pages', () => {
  return gulp.src('./pages/*')
    .pipe(gulp.dest('./dist/pages'));
});

gulp.task('copy-styles', () => {
  return gulp.src('./css/*')
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy-fonts', () => {
  return gulp.src('./fonts/*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copy-files', () => {
  return gulp.src(['./manifest.json', 'icon.png'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['build']);

gulp.task('default', ['watch']);








