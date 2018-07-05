const syntax = 'sass';

const gulp = require('gulp');
const gutil = require('gulp-util' );
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const browsersync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer  = require('gulp-autoprefixer');
const notify = require("gulp-notify");
const rsync = require('gulp-rsync');

gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		open: false,
		// tunnel: true,
		// tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sourcemaps.init())
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('app/css'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('bundle.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browsersync.reload({ stream: true }))
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('pug', function () {
	return gulp.src('app/pug/**/*.pug')
		.pipe(pug({
            pretty: true
		}))
		.pipe(gulp.dest('app/'))
});

gulp.task('watch', ['styles', 'js', 'pug', 'browser-sync'], function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
    gulp.watch('app/pug/**/*.pug', ['pug']);
	gulp.watch('app/*.html', browsersync.reload)
});

gulp.task('default', ['watch']);
