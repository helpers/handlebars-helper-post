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
        assets: 'test/assets',
        data: ['test/fixtures/data/*.json'],
        helpers: ['./index.js', 'test/fixtures/helpers/*.js'],
        partials: ['test/fixtures/includes/*.hbs'],
        markdown: {
          langPrefix: 'language-'
        },
        flatten: true,
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
      convert_false: {
        options: {
          postprocess: false,
          posts: {
            convert: false,
            sep: '<!-- Post -->\n',
            cwd: 'test/fixtures/foo',
          }
        },
        src: ['test/fixtures/*.hbs'],
        dest: 'test/actual/convert_false/'
      },
      sort_by_basename: {
        options: {
          posts: {
            sep: '<!-- Post -->\n',
            cwd: 'test/fixtures/foo',
            sortBy: 'basename' // this is default anyway
          }
        },
        src: ['test/fixtures/foo.hbs'],
        dest: 'test/actual/sort_by_basename/'
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
      },

      // The following targets all use the same data file,
      // which could instead be defined once at the task-level,
      // but it's done this way for purposes of example.
      json_opts_posts: {
        options: {
          data: ['test/fixtures/helperOptions.json']
        },
        src: ['test/fixtures/opts/posts.hbs'],
        dest: 'test/actual/json_opts/'
      },
      json_opts_docs: {
        options: {
          data: ['test/fixtures/helperOptions.json']
        },
        src: ['test/fixtures/opts/docs.hbs'],
        dest: 'test/actual/json_opts/'
      },
      json_opts_chapters: {
        options: {
          data: ['test/fixtures/helperOptions.json']
        },
        src: ['test/fixtures/opts/chapters.hbs'],
        dest: 'test/actual/json_opts/'
      }
    },


    /**
     * Pull down a list of repos from Github, for use
     * in the "Related repos" section of the README.
     */
    repos: {
      helpers: {
        options: {
          path: '/orgs/helpers/'
        },
        src: ['repos?page=1&per_page=100'],
        dest: 'docs/repos.json'
      }
    },


    /**
     * Extend context for templates
     * with repos.json
     */
    readme: {
      options: {
        metadata: ['<%= repos.helpers.dest %>']
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
