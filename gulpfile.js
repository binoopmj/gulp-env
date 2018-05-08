/**
 * @author Binoop M J <binoopmdvr@gmail.com>
 */

//gulpfile.js

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    newer = require('gulp-newer'), 
    notify  = require('gulp-notify'),
    imagemin = require('gulp-imagemin');


//style paths
var sassFiles = 'styles/**/*.scss',
    cssDest = 'styles/';

/**
 * Styles
*/
gulp.task('styles', function(){
    gulp.src('styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});

/**
 * Images
*/
gulp.task('images', function() {

// Add the newer pipe to pass through newer images only
    return  gulp.src(['img/*.{png,jpg,gif}'])
                .pipe(newer('img/*/'))
                .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
                .pipe(gulp.dest('img/'))
                .pipe( notify( { message: 'Images task complete', onLast: true } ) );
});
gulp.task('watch',function() {
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('img/*.{png,jpg,gif}', ['images']).on('change', browserSync.reload);
    gulp.watch(sassFiles,['styles']).on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('build', ['styles', 'images']);

