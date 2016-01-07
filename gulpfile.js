var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var webServer = require('gulp-webserver');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-sass');
var tsify = require('tsify');
var browserify = require('browserify');
var karma = require('karma');

gulp.task('clean', function () {
    gulp.src('./dist/*', './tmp/*', { read: false })
        .pipe(rimraf());
});

gulp.task('serve', function () {
    gulp.src('./')
        .pipe(webServer({
            port: 8000,
            livereload: true
        }));
});

gulp.task('sass', function () {
    gulp.src('./styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function () {
    browserify()
        .add('./src/**/*.ts')
        .plugin(tsify, { noImplicitAny: true })
        .bundle()
        .on('error', function (error) {
            console.error(error.toString());
        })
        .pipe(concat('tickets-app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-tests', function () {
    //TODO
});

gulp.task('test', function () {
    //TODO
});

gulp.task('e2e', function () {
    //TODO
});

gulp.task('watch', function () {
    //TODO
});
