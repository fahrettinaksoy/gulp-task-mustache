var gulp = require('gulp');
var connect = require('gulp-connect');
var mustache = require('gulp-mustache');

gulp.task('server', function(){
	return connect.server({
		root: 'dist',
		port: 3000
	});
});

gulp.task('mustache', function(){
	return gulp.src('./src/*.html')
	.pipe( mustache() )
	.pipe( gulp.dest('./dist') );
});

gulp.task('watch', function(){
	gulp.watch(['./src/**/*.html', './src/**/*.mustache'], ['mustache']);
});

gulp.task('build', ['mustache']);
gulp.task('default', ['server', 'mustache', 'watch']);