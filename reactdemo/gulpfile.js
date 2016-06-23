var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var b = browserify({
	entries: './src/todo/index.js',
	debug: true,
});
b.plugin(watchify, {
	ignoreWatch: ['**/node_modules/**'],
});
b.on('update', function(ids) {
	bundle();
	ids.forEach(function(v) {
		console.log('bundle changed file:' + v);  //记录改动的文件名
	})
});
gulp.task('build', bundle);

// gulp.task('watch', ['build'], function() {
// 	gulp.watch('src/**/*.js', ['build']);
// });

gulp.task('default', ['build']);

// 打包过程
function bundle() {
	return b.transform('babelify', { presets: ['es2015', 'react', 'stage-0']})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('dist'));
}