var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');

gulp.task('default', function () {
    nodemon({
        script: 'app/app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules', './typings', './.vscode']
    })
        .on('restart', function () {
            console.log('Restarting...');
        });
});

gulp.task('test', function () {
    env({ vars: { ENV: 'Test', PORT: 8001 } });
    gulp.src('tests/*.js')
        .pipe(gulpMocha({
            reporter: 'spec'
        }))
        .once('error', () => {
            process.exit(1);
        })
        .once('end', () => {
            process.exit();
        });
});
