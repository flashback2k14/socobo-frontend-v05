'use strict';

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
    dist: 'dist',
    tmp: '.tmp'
  };

  /**
   * Grunt Config
   */
  grunt.initConfig({
    /**
     * set Enum
     */
    yeoman: yeomanConfig,
    /**
     * maybe some clean up needed ;-P
     */
    /**
     * clean
     */
    clean: {
      tmp: '<%= yeoman.tmp %>',
      dist: '<%= yeoman.dist %>/*'
    },
    /**
     * copy
     */
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.html',
            'manifests/**',
            'images/**/*.{png,jpg,gif}'
          ]
        }]
      },
      elements: {
        files: [{
          expand: true,
          flatten: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>/elements',
          src: [
            'elements/**/*.html',
            '!elements/**/index.html',
            '!elements/**/*-test.html',
            '!elements/**/*-template.html',
            '!elements/**/*.css',
            '!elements/**/*.js'
          ]
        }]
      },
      styles_to_tmp: {
        files: [{
          expand: true,
          flatten: true,
          cwd: '<%= yeoman.app %>',
          src: ['**/*.css'],
          dest: '<%= yeoman.tmp %>/styles/'
        }]
      },
      scripts_to_tmp: {
        files: [{
          expand: true,
          flatten: true,
          cwd: '<%= yeoman.app %>',
          src: ['**/*.js'],
          dest: '<%= yeoman.tmp %>/scripts/'
        }]
      }
    },
    /**
     * concat CSS from .tmp
     */
    concat: {
      options: {
        separator: '/*next*/'
      },
      css: {
        src: '<%= yeoman.tmp %>/styles/{,*/}*.css',
        dest: '<%= yeoman.tmp %>/concat/styles/concat.css'
      },
      js: {
        src: '<%= yeoman.tmp %>/scripts/{,*/}*.js',
        dest: '<%= yeoman.tmp %>/concat/scripts/concat.js'
      }
    },
    /**
     * cssmin
     */
    cssmin: {
      css:{
        files: [{
          src: '<%= yeoman.tmp %>/concat/styles/*.css',
          dest: '<%= yeoman.dist %>/styles/style.min.css'
        }]
      }
    },
    /**
     * jsmin
     */
    uglify: {
      options: {
        mangle: true
      },
      my_scripts: {
        files: {
          '<%= yeoman.dist %>/scripts/script.min.js': ['<%= yeoman.tmp %>/concat/scripts/*.js']
        }
      }
    },
    /**
     * minifyHtml
     */
    minifyHtml: {
      options: {
        quotes: true,
        empty: true,
        spare: true,
        comments: true,
        loose: true
      },
      app: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    /**
     * replace
     */
    replace: {
      dist: {
        options: {
          patterns: [{
            match: /..\/bower_components\/webcomponentsjs\/webcomponents.js/g,
            replacement: '../bower_components/webcomponentsjs/webcomponents.min.js'
          },
          //without vulcanization
          {
            match: /\elements\/socobo-imports\/socobo-imports\.html/g,
            replacement: 'elements/socobo-imports.html'
          },
          //with vulcanization
          //{
          //  match: /\elements\/socobo-imports\/socobo-imports\.html/g,
          //  replacement: 'elements/socobo-imports.vulcanized.html'
          //},
          {
            match: /styles\/styles\.css/g,
            replacement: 'styles/style.min.css'
          },
          {
            match: /scripts\/main\.js/g,
            replacement: 'scripts/script.min.js'
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: '<%= yeoman.app %>/*.html',
          dest: '<%= yeoman.dist %>/'
        }]
      },
      elements: {
        options: {
          patterns: [{
            match: /href="..\/..\/..\/bower_components\/polymer\/polymer.html"/g,
            replacement: 'href="../../bower_components/polymer/polymer.html"'
          },{
            match: /src="[a-z-]+\.js"/g,
            replacement: 'src="../scripts/script.min.js"'
          },
          {
            match: /href="[a-z-]+\.css"/g,
            replacement: 'href="../styles/style.min.css"'
          }]
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['elements/**/*.html'],
          dest: '<%= yeoman.dist %>/'
        }]
      },
      imports: {
        options: {
          patterns: [{
            match: /..\/..\/..\//g,
            replacement: '../../'
          },
          {
            match: /..\/socobo-[a-z-]+\//g,
            replacement: ''
          }]
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['elements/*-imports.html'],
          dest: '<%= yeoman.dist %>/'
        }]
      },
      imports_deeper: {
        options: {
          patterns: [{
            match: /socobo-[a-z-]+\//g,
            replacement: ''
          }]
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['elements/*-imports.html'],
          dest: '<%= yeoman.dist %>/'
        }]
      }
    },
    /**
     * totally failed - vulcanize
     */
    vulcanize: {
      default: {
        options: {
          //csp: true,
          strip: true,
          excludes: {
            imports: [
              "polymer.html"
            ]
          }
        },
        files: {
          '<%= yeoman.dist %>/elements/socobo-imports.vulcanized.html':
              '<%= yeoman.app %>/elements/socobo-imports/socobo-imports.html'
        }
      }
    },
    /**
     * half failed - jshint
     */
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        //'<%= yeoman.tmp %>/scripts/*.js'        //--> Failed
        //'!<%= yeoman.app %>/scripts/vendor/*',  --> needed?
        //'test/spec/{,*/}*.js'                   --> needed?
      ]
    },
    /**
     * server
     */
    /**
     * browserSync
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
            baseDir: '<%= yeoman.app %>',
            routes: {
              '/bower_components': 'bower_components'
            }
          }
        },
        src: [
          '<%= yeoman.app %>/**/*.{css,html,js}'
        ]
      },
      dist: {
        options: {
          server: {
            baseDir: '<%= yeoman.dist %>',
            routes: {
              '/bower_components': 'bower_components'
            }
          }
        },
        src: [
          '<%= yeoman.dist %>/**/*.{css,html,js}'
        ]
      }
    },
    /**
     * autoprefixer
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
     * watch
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
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,gif}'
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
        ]
        //,tasks: 'autoprefixer:server'
      }
    },
    /**
     * test -- Failed - missing chromedriver?!
     */
    'wct-test': {
      local: {
        options: {remote: false}
      },
      remote: {
        options: {remote: true}
      }
      //,
      //chrome: {
      //  options: {browsers: ['chrome']}
      //},
      //files: {
      //  src: '<%= yeoman.app %>'
      //}
    },
    /**
     * Nice to have
     */
    /**
     * Pagespeed
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
   * Grunt tasks
   */
  grunt.registerTask('build', [
    'socobo-copying',
    'socobo-minification',
    'socobo-replacing',
    'clean:tmp'
  ]);

  /**
   * Grunt selfmade tasks
   */
  grunt.registerTask('socobo-copying', [
    'copy:dist',
    'copy:elements'
  ]);

  grunt.registerTask('socobo-minification', [
    'copy:styles_to_tmp',
    'concat:css',
    'cssmin',
    'copy:scripts_to_tmp',
    'concat:js',
    'jshint',
    'uglify:my_scripts',
    'minifyHtml'
    //,'vulcanize:default',
  ]);

  grunt.registerTask('socobo-replacing', [
    'replace:dist',
    'replace:elements',
    'replace:imports',
    'replace:imports_deeper'
  ]);

  /**
   * Grunt server tasks
   */
  grunt.registerTask('socobo-server-dev', [
    'serve'
  ]);

  grunt.registerTask('socobo-server-prod', [
    'serve:dist'
  ]);

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'browserSync:dist']);
    }

    grunt.task.run([
      'clean:tmp',
      //'autoprefixer:server',
      'browserSync:app',
      'watch'
    ]);
  });

  /**
   * Grunt test tasks
   */
  grunt.registerTask('test:local', [
    'wct-test:local'
  ]);

  grunt.registerTask('test:remote', [
    'wct-test:remote'
  ]);
};
