/**
 * Created by 111 on 16/3/29.
 */
var gulp = require('gulp'),
  plugins = require('gulp-load-plugins'),
  concat = require('gulp-concat'),
  webserver = require('gulp-webserver'),
  sass = require('gulp-sass'),
  config = require('./gulpConfig')();


gulp.task('sass', function () {
  gulp.src(config.sassPath)
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest(config.cssPath))
});

gulp.task('js', function () {
  gulp.src(config.jsPath)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./scripts/'));
});

gulp.task('server', function() {

  gulp.src('./')
    .pipe(webserver(config.serverConfig));
});

gulp.task('watch', function () {
  gulp.watch(config.sassPath, ['sass']);
  gulp.watch(config.jsPath, ['js']);
});

gulp.task('default', function () {
  gulp.start('sass', 'js', "watch");
});