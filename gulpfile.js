var gulp = require('gulp');
var connect = require('gulp-connect');
var mustache = require('gulp-mustache');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleancss = require('gulp-clean-css');

gulp.task('server', function(){
	return connect.server({
		root: 'dist',
		port: 3000,
		livereload: true
	});
});
gulp.task('style', function(){
	return gulp.src('./assets/style/*.scss')
	.pipe( sourcemaps.init() )
	.pipe( sass().on('error', sass.logError) )
	.pipe( autoprefixer() )
	.pipe( gulp.dest('./dist/common/css') )
	.pipe( cleancss() )
	.pipe( rename({ suffix: '.min' }) )
	.pipe( sourcemaps.write('./') )
	.pipe( gulp.dest('./dist/common/css') );
});
gulp.task('javascript', function(){
	return gulp.src('./assets/javascript/*.js')
	.pipe( sourcemaps.init() )
	.pipe( gulp.dest('./dist/common/js') )
	.pipe( uglify() )
	.pipe( rename({ suffix: '.min' }) )
	.pipe( sourcemaps.write('./') )
	.pipe( gulp.dest('./dist/common/js') );
});
gulp.task('html', function(){
	return gulp.src('./src/*.html')
	.pipe( mustache() )
	.pipe( gulp.dest('./dist') );
});
gulp.task('watch', function(){
	gulp.watch('./assets/style/*.scss', ['style']);
	gulp.watch('./assets/javascript/*.js', ['javascript']);
	gulp.watch(['./src/**/*.html', './src/**/*.mustache'], ['html']);
});
gulp.task('build', gulp.series('html', 'javascript', 'style'));
gulp.task('default', gulp.series('server', 'html', 'javascript', 'style', 'watch'));