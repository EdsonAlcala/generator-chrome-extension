import gulp from 'gulp';
import eslint from 'gulp-eslint';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import path from 'path';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import zip from 'gulp-zip';

let root = 'src';
let dist = 'dist';

// helper method for resolving paths
let resolveToApp = (glob = '') => {
    return path.join(root, glob);
};

let resolveToDist = (glob = '') => {
    return path.join(dist, glob);
};

// map of all paths
let paths = {
    files: ['src/manifest.json', 'src/icon.png'],
    pages: resolveToApp('pages/*'),
    pagesDist: resolveToDist('pages'),
    css: resolveToApp('css/*.css'),
    scss: resolveToApp('css/*.scss'),
    cssDist: resolveToDist('css'),
    img: resolveToApp('img/*'),
    imgDist: resolveToDist('img'),
    js: resolveToApp('js/*.js'),
    jsDist: resolveToDist('js'),  
    dist: dist,
    fonts: resolveToApp('fonts/*'),
    fontsDist: resolveToDist('fonts'),
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
  return gulp.src(paths.js)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.jsDist));
});

gulp.task('copy-images', () => {
  return gulp.src(paths.img)
    .pipe(gulp.dest(paths.imgDist));
});

gulp.task('copy-pages', () => {
  return gulp.src(paths.pages)
    .pipe(gulp.dest(paths.pagesDist));
});

gulp.task('copy-styles', ['sass']);

gulp.task('sass', function () {
  gulp.src(paths.scss)
    .pipe(plumber())
    .pipe(sass({
      //outputStyle: 'compressed',
      //includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets', config.bowerDir + '/font-awesome/scss']
    }))
    .pipe(gulp.dest(paths.cssDist));
});

gulp.task('copy-fonts', () => {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.fontsDist));
});

gulp.task('copy-files', () => {
  return gulp.src(paths.files)
    .pipe(gulp.dest(dist));
});

gulp.task('watch', () => {
  gulp.watch(paths.scss, ['copy-styles']);
  gulp.watch(paths.js, ['build-js']);   
  gulp.watch('gulpfile.babel.js', ['build']); 
});

gulp.task('zip', () => {
    return gulp.src('dist/*')
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['watch', 'lint', 'build']);








