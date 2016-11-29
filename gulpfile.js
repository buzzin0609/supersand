(function() {
	'use strict';
	var gulp = require('gulp');
	var concat = require('gulp-concat');
	var rename = require('gulp-rename');
	var watch = require('gulp-watch');
	var sass = require('gulp-sass');
	var sourcemaps = require('gulp-sourcemaps');
	var autoprefixer = require('gulp-autoprefixer');
	var autoprefixOptions = {
		browsers: ['last 4 versions'],
		cascade: false
	};

	/**
	* Simple log errors to the console and prevent gulp from shutting down if I missed a bracket when I saved or something
	*/
	function handleError(error) {
		console.log(error.toString());
		this.emit('end');
	}

	gulp.task('serve', [], () => {

		watch(['./src/**/**/*.scss'], function() {
			console.log('compiling sass');
			gulp.src('./src/app.scss')
			.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(sass({outputStyle: 'compressed'}))
			.pipe(autoprefixer(autoprefixOptions))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./public'));
		});

	});

	gulp.task('sass', () => {

	});

	gulp.task('default', ['serve']);

}());
