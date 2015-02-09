'use strict';

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

