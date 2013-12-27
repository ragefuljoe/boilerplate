/* Exports a function which returns an object that overrides the default &
 *   plugin file patterns (used widely through the app configuration)
 *
 * To see the default definitions for Lineman's file paths and globs, see:
 *
 *   - https://github.com/testdouble/lineman/blob/master/config/files.coffee
 */
module.exports = function(lineman) {
    //Override file patterns here
    return {
        js: {
            vendor: [
                "vendor/angular/angular.js",
                "vendor/angular-ui-router/release/angular-ui-router.js",
                "vendor/angular-ui-utils/modules/route/route.js",
                "vendor/angular-bootstrap/ui-bootstrap-tpls.js",
                "vendor/angular-bootstrap/ui-bootstrap.js",
            ],
            app: [
                "src/app/**/!(spec|e2e).js"
            ],
            spec: [
                "src/app/**/spec.*.js"
            ],
            specHelpers: [
                "src/spec/helpers/**/*.js"
            ],
            concatenated: "<%=buildDir %>js/app.js",
            concatenatedSpec: "<%=buildDir %>js/spec.js",
        },
        css: {
            vendor: [],
            app: [],
            concatenated: '<%=buildDir %>css/app.css',
            minified: '<%=distDir %>css/app.css',
        },
        less: {
            vendor: [
                "vendor/bootstrap/less/bootstrap.less"
            ],
            app: [
                "src/less/main.less"
            ],
            generatedApp: "<%=buildDir %>css/app.less.css",
            generatedVendor: "<%=buildDir %>css/vendor.less.css"
        },
        ngtemplates: {
            dest: "<%=buildDir %>js/template-cache.js"
        }
    };
};