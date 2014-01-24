/*global module:false*/
/*module.exports = function(grunt) {
  require('./config/lineman').config.grunt.run(grunt);
};*/
module.exports = function( grunt ) {

    // Load the tasks we need
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-testem');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-debug-task');

    var userConfig = require( './build.config.js' );

    taskConfig = {
        pkg: grunt.file.readJSON("package.json"),
        clean: [
          '<%= build_dir %>',
          '<%= compile_dir %>'
        ],
        concat: {
            compile_css: {
                src: [
                    '<%= build_dir %>/assets/vendor*.css',
                    '<%= build_dir %>/assets/<%= pkg.name %>*.css',
                ],
                dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
            },
            compile_js: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    '<%= vendor_files.js %>',
                    //'module.prefix',
                    '<%= build_dir %>/src/**/*.js',
                    //'<%= html2js.app.dest %>',
                    //'module.suffix'
                ],
                dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        copy: {
            build_app_assets: {
                files: [
                    {
                        src: [ '**' ],
                        dest: '<%= build_dir %>/assets/',
                        cwd: 'src/assets',
                        expand: true
                    }
                ]
            },
            build_vendor_assets: {
                files: [
                    {
                        src: [ '<%= vendor_files.assets %>' ],
                        dest: '<%= build_dir %>/assets/',
                        cwd: '.',
                        expand: true,
                        flatten: true
                    }
                ]
            },
            build_appjs: {
                files: [
                    {
                        src: [ '<%= app_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendorjs: {
                files: [
                    {
                        src: [ '<%= vendor_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            compile_assets: {
                files: [
                    {
                        src: [ '**' ],
                        dest: '<%= compile_dir %>/assets',
                        cwd: '<%= build_dir %>/assets',
                        expand: true
                    }
                ]
            }
        },
        delta: {
            /**
            * When the Gruntfile changes, we just want to lint it. In fact, when
            * your Gruntfile changes, it will automatically be reloaded!
            */
            gruntfile: {
                files: [ 'Gruntfile.js', 'build.config.js' ],
                tasks: [ 'jshint:gruntfile', 'build' ],
                options: {
                    livereload: false
                }
            },

            /**
            * When our JavaScript source files change, we want to run lint them and
            * run our unit tests.
            */
            jssrc: {
                files: [
                  '<%= app_files.js %>'
                ],
                tasks: [ 'jshint:src', 'copy:build_appjs' ]
            },

            /**
            * When assets are changed, copy them. Note that this will *not* copy new
            * files, so this is probably not very useful.
            */
            assets: {
                files: [
                  'src/assets/**/*'
                ],
                tasks: [ 'copy:build_assets' ]
            },

            /**
            * When index.html changes, we need to compile it.
            */
            html: {
                files: [ '<%= app_files.html %>' ],
                tasks: [ 'index:build' ]
            },

            ngtemplates: {
                files: '<%= app_files.templates %>',
                tasks: [ 'ngtemplates' ]
            },

            /**
            * When the CSS files change, we need to compile and minify them.
            */
            less: {
                files: [ 'src/**/*.less' ],
                tasks: [ 'less:development' ]
            }
        },
        index: {
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= build_dir %>/assets/*.css',
                    '<%= ngtemplates.app.dest %>',
                ]
            },
            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= compile_dir %>/src/**/*.js',
                    '<%= compile_dir %>/assets/*.css'
                ]
            }
        },
        jshint: {
            app: [
                '<%= app_files.js %>'
            ],
            test: [
                '<%= app_files.jsunit %>'
            ],
            gruntfile: [
                'Gruntfile.js',
                'build.config.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            }
        },
        less: {
            development: {
                options: {
                    sourceMap: true
                },
                files: [
                    {
                        dest: '<%= build_dir %>/assets/app-<%= pkg.version %>.css',
                        src: '<%=app_files.less %>'
                    },
                    {
                        dest: '<%= build_dir %>/assets/vendor-<%= pkg.version %>.css',
                        src: '<%=vendor_files.less %>'
                    }
                ]
            },
            production: {
                options: {
                    cleancss: true,
                    compress: true
                },
                files: [
                    {
                        dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css',
                        src: '<%=app_files.less %>'
                    },
                    {
                        dest: '<%= compile_dir %>/assets/vendor-<%= pkg.version %>.css',
                        src: '<%=vendor_files.less %>'
                    }
                ]
            }
        },
        /**
        * The banner is the comment that is placed at the top of our compiled
        * source files. It is first processed as a Grunt template, where the `<%=`
        * pairs are evaluated based on this very configuration object.
        */
        meta: {
            banner:
                '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
                ' */\n'
        },
        ngtemplates: {
            app: {
                src: '<%= app_files.templates %>',
                dest: '<%= build_dir %>/src/templates.js',
                options: {
                    module: '<%= pkg.name %>'
                }
            }
        },
        testem: {
            environment1: {
                src: [
                ],
                options: {
                    parallel: 8,
                    launch_in_ci: [],
                    launch_in_dev: []
                }
            }
        }
    };

    grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

    grunt.renameTask( 'watch', 'delta' );
    grunt.registerTask( 'watch', [ 'build', 'delta' ] );
    grunt.registerTask( 'default', [ 'build', 'compile' ] );
    grunt.registerTask( 'build', [
        'clean', 'ngtemplates', 'jshint', 'less:development', 'copy:build_appjs', 
        'copy:build_vendor_assets', 'copy:build_vendorjs', 'index:build'
    ]);
    grunt.registerTask( 'compile', [
        'clean', 'ngtemplates', 'jshint', 'less:production', 'copy:build_appjs', 
        'copy:build_vendor_assets', 'copy:build_vendorjs', 'concat:compile_js', 'concat:compile_css', 'index:compile'
    ]);

    grunt.registerTask( 'spec', [ 'testem' ]);
    grunt.registerTask( 'spec-ci', [ 'testem' ]);

    /**
    * A utility function to get all app JavaScript sources.
    */
    function filterForJS ( files ) {
        return files.filter( function ( file ) {
            return file.match( /\.js$/ );
        });
    }

    /**
    * A utility function to get all app CSS sources.
    */
    function filterForCSS ( files ) {
        return files.filter( function ( file ) {
            return file.match( /\.css$/ );
        });
    }

    grunt.registerMultiTask( 'index', 'Process index.html template', function () {
        var dirRE = new RegExp( '^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g' ),
            jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
                return file.replace( dirRE, '' );
            }),
            cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
                return file.replace( dirRE, '' );
            });

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function ( contents, path ) {
                return grunt.template.process( contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config( 'pkg.version' )
                    }
                });
            }
        });
    });
};