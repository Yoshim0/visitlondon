var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');

// SOURCEFILES
var sourcePaths ={
	sassSource : 'src/scss/*.scss',
	htmlSource : 'src/*.html',
	jsSource : 'src/js/*.js'
}

// APP FILES
var appPaths ={
	root : 'app/',
	css : 'app/css',
	js : 'app/js'
}

// CLEAR UNUSED HTML FILES
/*
** Set path to check for unused files in app folder
** read false to not 
*/
gulp.task('cleanHtml', function(){
	return gulp.src(appPaths.root + '/*.html', {read: true, force: true })
		.pipe(clean());
});

// CLEAR UNUSED JS FILES
/*
** Set path to check for unused files in app folder
** read false to not 
*/
gulp.task('cleanJs', function(){
	return gulp.src(appPaths.js + '/*.js', {read: false, force: true })
		.pipe(clean());
});

// SASS COMPILER 
/* 
** Set the path to compile the files
** Autoprefix before compile
** Output compressed, nested, expanded
** Set destination for compiled css files
*/
gulp.task('sass', function(){
	return gulp.src(sourcePaths.sassSource)
		.pipe(autoprefixer())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest(appPaths.css));
});

// JS COMPILER
/*
** Set the path to compile the files
** Set destination for compiled js files
*/
gulp.task('scripts', ['cleanJs'], function(){
	gulp.src(sourcePaths.jsSource)
		.pipe(gulp.dest(appPaths.js));
});

// HTML COPY
/*
** Set the path to copy files from
** Clear unused files
** Set destination to copy files to.
*/
gulp.task('copy', ['cleanHtml'], function(){
	gulp.src(sourcePaths.htmlSource)
		.pipe(gulp.dest(appPaths.root))
});

// BROWSERSYNC
/*
** Initialize the folders for sync in Browser
*/
gulp.task('serve', ['sass'], function(){
	browserSync.init([appPaths.css + '/*.css', appPaths.root + '/*.html', appPaths.js + '/*.js'],{
		server: {
			baseDir : appPaths.root
		}
	})
});

// GULP TASKS
/*
** Watch changed files and execute tasks
** Copy HTML files
*/
gulp.task('watch', ['serve', 'sass', 'copy', 'cleanHtml', 'scripts', 'cleanJs'], function(){
	gulp.watch([sourcePaths.sassSource], ['sass']);
	gulp.watch([sourcePaths.htmlSource], ['copy']);
	gulp.watch([sourcePaths.jsSource], ['scripts']);
});

// GULP DEFAULT TASK
/*
** Execute previous task all at once
*/
gulp.task('default', ['watch']);