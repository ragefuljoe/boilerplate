/*global module:false*/
/*module.exports = function(grunt) {
  require('./config/lineman').config.grunt.run(grunt);
};*/
module.exports = function( grunt ) {

    // Load the tasks we need
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-testem');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-angular-templates');

    var userConfig = require( './build.config.js' );

    taskConfig = {
        clean: [
          '<%= build_dir %>',
          '<%= compile_dir %>'
        ],
        jshint: {
            src: [
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
            },
            globals: {}
        },
        index: {
            /**
            * During development, we don't want to have wait for compilation,
            * concatenation, minification, etc. So to avoid these steps, we simply
            * add all script files directly to the `<head>` of `index.html`. The
            * `src` property contains the list of included files.
            */
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= vendor_files.css %>'
                ]
            },

            /**
            * When it is time to have a completely compiled application, we can
            * alter the above to include only a single JavaScript and a single CSS
            * file. Now we're back!
            */
            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= concat.compile_js.dest %>',
                    '<%= vendor_files.css %>'
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

            /**
            * When our templates change, we only rewrite the template cache.
            */
            tpls: {
                files: '<%= app_files.templates %>',
                tasks: [ 'html2js' ]
            },

            /**
            * When the CSS files change, we need to compile and minify them.
            */
            less: {
                files: [ 'src/**/*.less' ],
                tasks: [  ]
            }
        },
        testem: {
            environment1: {
                src: [
                    'bower_components/jquery/jquery.js',
                    'source/**/*.coffee',
                    'spec/helpers/*.coffee',
                    'spec/**/*_spec.coffee'
                ],
                options: {
                    parallel: 8,
                    launch_in_ci: ['PhantomJS', 'Firefox', 'Safari'],
                    launch_in_dev: ['PhantomJS', 'Firefox', 'Safari']
                }
            }
        }
    };

    grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

    grunt.renameTask( 'watch', 'delta' );
    grunt.registerTask( 'watch', [ 'build', 'delta' ] );
    grunt.registerTask( 'default', [ 'build', 'compile' ] );
    grunt.registerTask( 'build', [ 'clean', 'index:build' ]);
    grunt.registerTask( 'compile', [  ]);

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
        var dirRE = new RegExp( '^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g' );
        var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
            return file.replace( dirRE, '' );
        });
        var cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
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