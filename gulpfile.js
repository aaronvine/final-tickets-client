'use strict';
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var webServer = require('gulp-webserver');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-sass');
var tsify = require('tsify');
var browserify = require('browserify');
var glob = require('glob');
var Server = require('karma').Server;

gulp.task('clean', function () {
    gulp.src('./dist/*', { read: false })
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
    gulp.src('./src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function () {
    browserify('./src/tickets.mdl.ts')
        .plugin(tsify)
        .bundle()
        .on('error', function (error) {
            console.error(error.toString());
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-tests', function () {
    browserify(glob.sync('./src/**/*.test.ts'))
        .plugin(tsify)
        .bundle()
        .on('error', function (error) {
            console.error(error.toString());
        })
        .pipe(source('bundle.test.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});

gulp.task('e2e', function () {
    //TODO
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.ts', ['js']);
});

gulp.task('default', ['js', 'serve', 'watch']);
