var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    env = require('gulp-env');

//Default task for project
gulp.task('default', function(){
  //link up nodemon to project
	nodemon({
		script: 'app.js',
		ext: 'js',
		env: {
			PORT: 8888
},
		ignore: ['./node_modules/**']
	}).on('restart', function(){
	console.log('we have restarted');
});
});

