var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');

var sourcePaths ={
	sassSource : 'src/scss/*.scss'
}

var appPaths ={
	root : 'app/',
	css : 'app/css',
	js : 'app/js'
}

// GULP TASK 
gulp.task('sass', function(){
	return gulp.src(sourcePaths.sassSource)
		.pipe(autoprefixer())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest(appPaths.css));
});

gulp.task('serve', ['sass'], function(){
	browserSync.init([appPaths.css + '/*.css', appPaths.root + '/*.html', appPaths.js + '/*.js'],{
		server: {
			baseDir : appPaths.root
		}
	})
});

gulp.task('watch', ['serve', 'sass'], function(){
	gulp.watch([sourcePaths.sassSource], ['sass']);
});

gulp.task('default', ['watch']);