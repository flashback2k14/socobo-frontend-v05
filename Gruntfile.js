'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'wct-test': {
            local: {
                options: {remote: false}
            },
            remote: {
                options: {remote: true}
            },
            chrome: {
                options: {browsers: ['chrome']}
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('web-component-tester');

    grunt.registerTask('test', [
        'wct-test:chrome'
    ]);

    grunt.registerTask('test-local', [
        'wct-test:local'
    ]);

};

