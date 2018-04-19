var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  gulp.src('./UI/assets/scss/style.scss')
    .pipe(sass({
      includePaths: ['./UI/assets/scss']
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./UI/assets/css'))
});

// Rerun the task when a file changes 
gulp.task('watch', function () {
  gulp.watch('./UI/assets/scss/**/*.scss', ['sass']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'sass']);
