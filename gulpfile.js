var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var sourcePaths = {
	sassSource : 'src/scss/*.scss'
}

var appPaths = {
	root : 'app/',
	cssSource : 'app/css',
	js : 'app/js'
}

gulp.task('sass', function(){
	return gulp.src('sourcePaths.sassSource')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest('appPaths.css'));
});

gulp.task('serve', ['sass'], function(){
	browserSync.init([appPaths.css + '/*.css', appPaths.root + '/*.html', appPaths.js + '/*.js'],{
		server: {
			baseDir : appPaths.root
		}
	})
});

gulp.task('default', ['serve']);