/* Exports a function which returns an object that overrides the default &
 *   plugin grunt configuration object.
 *
 * You can familiarize yourself with Lineman's defaults by checking out:
 *
 *   - https://github.com/testdouble/lineman/blob/master/config/application.coffee
 *   - https://github.com/testdouble/lineman/blob/master/config/plugins
 *
 * You can also ask Lineman's about config from the command line:
 *
 *   $ lineman config #=> to print the entire config
 *   $ lineman config concat.js #=> to see the JS config for the concat task.
 */
module.exports = function(lineman) {
  //Override application configuration here. Common examples follow in the comments.
  return {
    actionHero: {
        directory: process.cwd() + '/server/',
        config: {
            logger: {
                transports: null
            }
        }
    },
    buildDir: "build/",
    distDir: "dist/",
    // API Proxying
    //
    // During development, you'll likely want to make XHR (AJAX) requests to an API on the same
    // port as your lineman development server. By enabling the API proxy and setting the port, all
    // requests for paths that don't match a static asset in ./build will be forwarded to
    // whatever service might be running on the specified port.
    //
    spec: {
        options: {
            growl: true
        }
    },
    server: {
        base: '<%=buildDir %>',
        apiProxy: {
            enabled: true,
            host: 'localhost',
            port: 3000,
            prefix: 'api'
        }
    },
    copy: {
        dev: {
            files: [
                {
                    expand: true,
                    cwd: "app/assets",
                    src: "**",
                    dest: "<%=buildDir %>assets"
                }
            ]
        },
        dist:{
            files: [
                {
                    expand: true,
                    cwd: "app/assets",
                    src: "**",
                    dest: "<%=distDir %>assets"
                }
            ]
        }
    },
    clean: {
        js: {
            src: '<%= files.js.concatenated %>'
        },
        css:{
            src: '<%= files.css.concatenated %>'
        },
        dist:{
            src: [ 'dist', 'build', 'generated' ]
        }
    },
    pages: {
        dev: {
            src: 'src/index.us',
            dest: "<%=buildDir %>index.html"
        },
        dist: {
            src: 'src/index.us',
            dest: '<%=distDir %>index.html'
        }
    },
    concat: {
        css: {
            src: [
                "<%= files.less.generatedVendor %>",
                "<%= files.less.generatedApp %>",
            ],
            dest: "<%= files.css.concatenated %>"
        },
    },
    less: {
        options: {
            paths: []
        }
    },
    removeTasks:{
        common: [ "handlebars", "coffee", "jst" ],
        dev: [ "images:dev", "webfonts:dev" ],
        dist: [ "images:dist", "webfonts:dist" ]
    },
    jshint: {
        with_overrides: {
            options: {
                browser: false
            },
            files: {
                src: ["server/**/!(spec|e2e).js"]
            }
        }
    },
    watch: {
        pages: {
            files: "src/index.us"
        }
    }

    // Asset Fingerprints
    //
    // Lineman can fingerprint your static assets by appending a hash to the filename
    // and logging a manifest of logical-to-hashed filenames in dist/assets.json
    // via grunt-asset-fingerprint
    //
    // enableAssetFingerprint: false

  };
};
