var gulp = require ('gulp'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer');

//  Scritp tasks
//   Uglifies
gulp.task('scripts', function(){
  gulp.src('js/*.js')
      .pipe(plumber())
      .pipe(uglify())
      .pipe(gulp.dest('build/js'));

  gulp.src('css/main.css')
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('build/css'))
});

//  Watch tasks
//   Uglifies
gulp.task('watch', ['browserSync'], function(){
gulp.watch('js/*.js', browserSync.reload);
gulp.watch('index.html', browserSync.reload);
gulp.watch('css/*.css', browserSync.reload);
});

//  Auto load browser
//   BrowserSync
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      proxy: "local.dev"
    }
  });
});

gulp.task('default', ['scripts', 'watch']);
