var gulp = require('gulp'); // Initiate Gulp
var sass = require('gulp-sass'); // Gulp Sass Compiler
var browserSync = require('browser-sync'); // Sync with Browser
var reload = browserSync.reload; // Reload Browser after changes
var autoprefixer = require('gulp-autoprefixer'); // Auto Prefix
var clean = require('gulp-clean'); // Clean Files
var concat = require('gulp-concat'); // Concatenate files
var browserify = require('gulp-browserify'); // Lets you require modules in the browser by bundling up all of you dependencies
var merge = require('merge-stream'); // Concatenate CSS files

// SOURCEFILES
var sourcePaths ={
	sassSource : 'src/scss/*.scss',
	htmlSource : 'src/*.html',
	jsSource : 'src/js/**'
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
  var bootstrapCss = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');
  var sassFiles;


	sassFiles = gulp.src(sourcePaths.sassSource)
		.pipe(autoprefixer())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		
    return merge(bootstrapCss, sassFiles)
      .pipe(concat('app.css'))
      .pipe(gulp.dest(appPaths.css));
});

// JS COMPILER
/*
** Set the path to compile the files
** Concatenate JS files into one file
** Set destination for compiled js files
*/
gulp.task('scripts', ['cleanJs'], function(){
	gulp.src(sourcePaths.jsSource)
		.pipe(concat('main.js'))
    .pipe(browserify())
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