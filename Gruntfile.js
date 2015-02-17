'use strict';

/**
 * Tutorials
 *  http://gruntjs.com/sample-gruntfile
 *  http://blog.teamtreehouse.com/getting-started-with-grunt
 */
/**
 * http://stackoverflow.com/questions/13713273/how-to-concatenate-and-minify-multiple-css-and-javascript-files-with-grunt-js
 *
 * Workflow
 *  1. Copy all JS, CSS in .tmp
 *  2. Concat JS, CSS from .tmp
 *  3. Min JS
 *  4. Min CSS
 *  5. Maybe delete .tmp
 */
module.exports = function (grunt) {
  //show elapsed time at the end
  require('time-grunt')(grunt);
  //load all grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('web-component-tester');

  /**
   * configurable paths
   */
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  /**
   * Grunt Config
   */
  grunt.initConfig({
    yeoman: yeomanConfig,
    /**
     * Watch
     */
    watch: {
      options: {
        nospawn: true
      },
      default: {
        files: [
          '<%= yeoman.app %>/*.html',
          '<%= yeoman.app %>/elements/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/elements/{,*/}*.{css,js}',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint']
      },
      styles: {
        files: [
          '<%= yeoman.app %>/styles/{,*/}*.css',
          '<%= yeoman.app %>/elements/{,*/}*.css'
        ],
        tasks: ['copy:styles', 'autoprefixer:server']
      },
      json: {
        files: ['<%= yeoman.app %>/manifests/{,*/}*.json']
      }
    },
    /**
     * Autoprefixer
     */
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      server: {
        files: [{
          expand: true,
          cwd: '.tmp',
          src: '**/*.css',
          dest: '.tmp'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['**/*.css', '!bower_components/**/*.css'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    /**
     * BrowserSync
     */
    browserSync: {
      options: {
        notify: false,
        port: 9000,
        open: true
      },
      app: {
        options: {
          watchTask: true,
          injectChanges: false, // can't inject Shadow DOM
          server: {
            baseDir: ['.tmp', '<%= yeoman.app %>'],
            routes: {
              '/bower_components': 'bower_components'
            }
          }
        },
        src: [
          '.tmp/**/*.{css,html,js}',
          '<%= yeoman.app %>/**/*.{css,html,js}'
        ]
      },
      dist: {
        options: {
          server: {
            baseDir: 'dist'
          }
        },
        src: [
          '<%= yeoman.dist %>/**/*.{css,html,js}',
          '!<%= yeoman.dist %>/bower_components/**/*'
        ]
      }
    },
    /**
     * Clean
     */
    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },
    /**
     * Jshint
     */
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        //'<%= yeoman.app %>/scripts/{,*/}*.js'   --> Failed
        //'!<%= yeoman.app %>/scripts/vendor/*',  --> needed?
        //'test/spec/{,*/}*.js'                   --> needed?
      ]
    },
    /**
     * UseminPrepare
     */
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    /**
     * Usemin
     */
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    /**
     * Replace
     */
    replace: {
      dist: {
        options: {
          patterns: [{
            match: /\/elements\/socobo-imports\/socobo-imports\.html/g,
            replacement: '/elements/socobo-imports/socobo-imports.vulcanized.html'
          }]
        },
        files: {
          '<%= yeoman.dist %>/index.html': ['<%= yeoman.dist %>/index.html']
        }
      }
    },
    /**
     * Vulcanize
     */
    vulcanize: {
      default: {
        options: {
          strip: true
        },
        files: {
          '<%= yeoman.dist %>/elements/socobo-imports/socobo-imports.vulcanized.html': [
            '<%= yeoman.dist %>/elements/socobo-imports/socobo-imports.html'
          ]
        }
      }
    },
    /**
     * Imagemin
     */
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,svg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    /**
     * Failed - cssmin
     */
    cssmin: {
      css:{
        files: [
          { src: '<%= yeoman.app %>/styles/{,*/}*.css', dest: '<%= yeoman.dist %>/styles/style.min.css' },
          { src: '<%= yeoman.app %>/styles/{,*/}*.css', dest: '.tmp/styles/style.min.css' }
        ]

        //src: '<%= yeoman.app %>/styles/{,*/}*.css',
        //dest: '<%= yeoman.dist %>/styles/style.min.css'
      }
      //main: {
      //  files: {
      //    '<%= yeoman.dist %>/styles/main.css': [
      //      '.tmp/concat/styles/{,*/}*.css'   //--> Failed - needed?
      //      //'.tmp/styles/{,*/}*.css',
      //      //'.tmp/elements/**/*.css'
      //    ]
      //  }
      //},
      //elements: {
      //  files: [{
      //    expand: true,
      //    cwd: '.tmp/elements',
      //    src: '{,*/}*.css',
      //    dest: '<%= yeoman.dist %>/elements'
      //  }]
      //}
    },
    /**
     * OK - MinifyHtml
     */
    minifyHtml: {
      options: {
        quotes: true,
        empty: true,
        spare: true
      },
      app: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    /**
     * OK - Copy
     */
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            //'*.{ico,txt}',
            //'.htaccess',
            '*.html',
            'elements/**',
            'manifests/**',
            'scripts/**',
            //'styles/**',
            '!elements/**/*.css',
            'images/**/*.{png,,jpg,gif}'
          ]
        }, {
          expand: true,
          dot: true,
          dest: '<%= yeoman.dist %>',
          src: ['bower_components/**']
        }]
      },
      styles: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          dest: '.tmp',
          src: ['{styles,elements}/{,*/}*.css']
        }]
      }
    },
    /**
     * Failed - Tests
     */
    'wct-test': {
      local: {
        options: {remote: false}
      },
      remote: {
        options: {remote: true}
      }
    },
    /**
     * OK - Pagespeed
     */
    pagespeed: {
      // See this tutorial if you'd like to run PageSpeed
      // against localhost: http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/
      options: {
        // By default, we use the PageSpeed Insights
        // free (no API key) tier. You can use a Google
        // Developer API key if you have one. See
        // http://goo.gl/RkN0vE for info
        nokey: true
      },
      // Update `url` below to the public URL for your site
      mobile: {
        options: {
          url: "https://socobo.herokuapp.com/",
          locale: "en_US",
          strategy: "mobile",
          threshold: 80
        }
      }
    }
  });

  /**
   * Grunt Tasks
   */
  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'browserSync:dist']);
    }

    grunt.task.run([
      'clean:server',
      'copy:styles',
      'autoprefixer:server',
      'browserSync:app',
      'watch'
    ]);
  });

  grunt.registerTask('test:local', ['wct-test:local']);
  grunt.registerTask('test:remote', ['wct-test:remote']);

  grunt.registerTask('build', [
    'clean:dist',
    'copy',
    //'useminPrepare', --> Failed
    //'imagemin',      --> Failed
    //'concat',        --> Failed
    'autoprefixer',
    //'uglify',        --> Failed
    //'cssmin',        --> Failed
    //'vulcanize',     --> Failed
    //'usemin',        --> Failed
    'replace',
    'minifyHtml'
  ]);

  grunt.registerTask('default', [
    'jshint',
    //'test:local',    --> Failed
    'build'
  ]);
};
