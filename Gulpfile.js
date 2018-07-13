var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var open = require('gulp-open'),
    os = require('os');

gulp.task('express', function() {
    var app = require('./app');
    var debug = require('debug')('test:server');
    var http = require('http');

    /**
     * Get port from environment and store in Express.
     */

    var port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);

    /**
     * Create HTTP server.
     */

    var server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    /**
     * Normalize a port into a number, string, or false.
     */

    function normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }
});

//sass built task
gulp.task('sass', function () {
    gulp.src(['./sass/**/*.scss'])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src([
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js.map', 
        './node_modules/jquery/dist/jquery.min.js', 
        './node_modules/tether/dist/js/tether.min.js', 
        './node_modules/angular/angular.js',
        './node_modules/lodash/lodash.js',
        './node_modules/jquery-backstretch/jquery.backstretch.min.js',
        './node_modules/wowjs/dist/wow.min.js',
        './node_modules/waypoints/lib/jquery.waypoints.js',
        //'./node_modules/mdbootstrap/js/mdb.min.js',
        //'./node_modules/material-kit/assets/js/material-kit.min.js'
        ])
        .pipe(gulp.dest("./public/javascripts"))
        .pipe(browserSync.stream());
});

gulp.task('css', function () {
    gulp.src(['./node_modules/font-awesome/css/font-awesome.css', 
        './node_modules/animate.css/animate.css',
        './node_modules/bootstrap/css/bootstrap.css',
        //'./node_modules/mdbootstrap/css/mdb.min.css'
        //'./node_modules/material-kit/assets/css/material-kit.min.css'
        ])
        .pipe(gulp.dest('./public/stylesheets'))
        .pipe(browserSync.stream());
});

//sass watch task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

//task to open default browser and point to root
gulp.task('open', function () {
    var browser =   os.platform() === 'linux' ? 'google-chrome' : (
        os.platform() === 'darwin' ? 'google chrome' : (
            os.platform() === 'win32' ? 'chrome' : 'firefox'));
    gulp.src('').pipe(open({app: browser, uri: 'http://localhost:3000'}));
});

gulp.task('default', ['express','js','css','sass','sass:watch','open'], function() {

});