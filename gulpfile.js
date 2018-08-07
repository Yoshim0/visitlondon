var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');

// SOURCEFILES
var sourcePaths ={
	sassSource : 'src/scss/*.scss',
	htmlSource : 'src/*.html'
}

// APP FILES
var appPaths ={
	root : 'app/',
	css : 'app/css',
	js : 'app/js'
}

// SASS COMPILER 
gulp.task('sass', function(){
	return gulp.src(sourcePaths.sassSource)
		.pipe(autoprefixer())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest(appPaths.css));
});

gulp.task('copy', function(){
	gulp.src(sourcePaths.htmlSource)
		.pipe(gulp.dest(appPaths.root))
});

// BROWSERSYNC
gulp.task('serve', ['sass'], function(){
	browserSync.init([appPaths.css + '/*.css', appPaths.root + '/*.html', appPaths.js + '/*.js'],{
		server: {
			baseDir : appPaths.root
		}
	})
});

// GULP TASKS
gulp.task('watch', ['serve', 'sass', 'copy'], function(){
	gulp.watch([sourcePaths.sassSource], ['sass']);
	gulp.watch([sourcePaths.htmlSource], ['copy']);
});

// GULP DEFAULT TASK
gulp.task('default', ['watch']);