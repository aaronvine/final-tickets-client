'use strict';
// Karma configuration
// Generated on Mon Dec 21 2015 15:38:45 GMT+0200 (IST)

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser
        files: [
            'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular.min.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular-mocks.js',
            'http://angular-ui.github.io/ui-router/release/angular-ui-router.js',
            'https://cdnjs.cloudflare.com/ajax/libs/q.js/1.0.1/q.min.js',
            './dist/bundle.js',
            './dist/bundle.test.js'
        ],
        // list of files to exclude
        exclude: [
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],
        // web server port
        port: 9876,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'Chrome'
        ],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    });
};
