var path = require('path');
var util = require('util');

var del = require('del');
var gulp = require('gulp-help')(require('gulp'));
var webpack = require('gulp-webpack');
var gulpShell = require('gulp-shell');
var gulpUtil = require('gulp-util');
var minimist = require('minimist');
var nodemon = require('gulp-nodemon');

gulp.task('clean', 'Clean built files.', function(cb) {
	del('dist', cb);
});

gulp.task('build', 'Build application.', function() {
	var build = gulp.src('client/index.jsx')
		.pipe(webpack( require('./webpack.config.prod.js') ))
		.pipe(gulp.dest('server/dist/js'));

	var copy = gulp
		.src(['client/index.html', 'client/styles/*.css'], {base: 'client/'})
		.pipe(gulp.dest('server/dist'));
});

gulp.task('dev', 'Run client and server simultaneously.', ['server', 'client']);

gulp.task('client', 'Run client webpack-dev-server.', function() {
		var options = minimist(process.argv.slice(2), {
			alias: {
				p: 'port'
			},
			default: {
				port: 8080
			}
		});

		gulpUtil.log('[webpack-dev-server]', util.format('http://localhost:%d/',
			options.port));

		return gulp.src('')
			.pipe(gulpShell([
				path.join(__dirname + '/node_modules/.bin/webpack-dev-server'),
				'--colors',
				'--config webpack.config.js',
				'--content-base client',
				'--hot',
				'--inline',
				util.format('--port %d', options.port),
				'--progress',
				'--host 127.0.0.1'
			].join(' '), {
				cwd: __dirname
			}));
	},

	{
		options: {
			'port <port>': 'port (default: 8080)'
		}
	});

gulp.task('default', false, ['help']);

// gulp.task('default', ['nodemon', 'dev'], function() {
//
// });

gulp.task('mongo', function() {
	gulp.src('')
		.pipe(gulpShell([
			'mongod',
			'--dbpath=./data/db'
		].join(' '), {
			cwd: __dirname
		}));
});

gulp.task('heroku:push:amend', ['build'], function() {
	gulp.src('')
	.pipe(gulpShell('git add --all .'))
	.pipe(gulpShell('git commit --amend --no-edit'))
	.pipe(gulpShell('git push heroku master --force'));
});

gulp.task('server', function(cb) {
	return nodemon({
		script: 'server/app.js'
	}).on('start', function() {
		cb();
	});
});
