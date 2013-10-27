/*
 * handlebars-helper-post
 * https://github.com/helpers/handlebars-helper-post
 * Copyright (c) 2013
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var pretty = require('pretty');

  // Project configuration.
  grunt.initConfig({

    site: grunt.file.readYAML('test/fixtures/_config.yml'),

    // Lint JavaScript
    jshint: {
      all: ['Gruntfile.js', 'index.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    /**
     * Build HTML from templates and data
     */
    assemble: {
      options: {
        site: '<%= site %>',
        flatten: true,
        assets: 'test/assets',
        data: ['test/fixtures/posts.json'],
        helpers: ['./index.js'],
        markdown: {
          langPrefix: 'language-'
        },
        postprocess: pretty
      },
      pages: {
        options: {
          posts: {
            sep: '<!-- Post -->\n',
            cwd: 'test/fixtures/foo',
          }
        },
        src: ['test/fixtures/*.hbs'],
        dest: 'test/actual/posts/'
      },
      convert_before: {
        options: {
          posts: {
            // convert: 'before',
            sep: '<!-- Post -->\n',
            cwd: 'test/fixtures/foo',
          }
        },
        src: ['test/fixtures/*.hbs'],
        dest: 'test/actual/convert_before/'
      },
      sort_by_num: {
        options: {
          posts: {
            sep: '<!-- Post -->\n',
            cwd: 'test/fixtures/foo',
            sortBy: 'num'
          }
        },
        src: ['test/fixtures/foo.hbs'],
        dest: 'test/actual/sort_by_num/'
      },
      sort_by_title: {
        options: {
          posts: {
            sep: '<!-- Post -->\n',
            cwd: 'test/fixtures/foo',
            sortBy: 'title'
          }
        },
        src: ['test/fixtures/foo.hbs'],
        dest: 'test/actual/sort_by_title/'
      },
      sort_by_foo: {
        options: {
          posts: {
            sep: '<!-- Post -->\n',
            cwd: 'test/fixtures/foo',
            sortBy: 'foo'
          }
        },
        src: ['test/fixtures/foo.hbs'],
        dest: 'test/actual/sort_by_foo/'
      },
      reverse_order: {
        options: {
          posts: {
            sep: '<!-- Post -->\n',
            cwd: 'test/fixtures/foo',
            sortBy: 'title',
            sortOrder: 'foo'
          }
        },
        src: ['test/fixtures/foo.hbs'],
        dest: 'test/actual/reverse_order/'
      }
    },


    /**
     * Before generating any new files,
     * remove files from previous build.
     */
    clean: {
      example: ['test/actual/**/*']
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-readme');
  grunt.loadNpmTasks('assemble');

  // Default tasks to be run.
  grunt.registerTask('default', ['jshint', 'assemble', 'readme']);
};
