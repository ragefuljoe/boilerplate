module.exports = {
    build_dir: 'build',
    compile_dir: 'bin',
    app_files: {
        js: [
            'src/**/*.js',
            '!src/**/spec.*.js',
            '!src/**/e2e.*.js',
            '!src/assets/**/*.js',
            '!src/spec/helpers/*.js'
        ],

        jsunit: [
            'src/app/**/spec.*.js'
        ],

        templates: [
            'src/app/**/*.tpl.html',
            'src/common/**/*.tpl.html'
        ],

        html: [ 'src/index.html' ],
        less: 'src/less/main.less'
    },
    vendor_files: {
        js: [
            'vendor/angular/angular.js'
        ],
        /** This can be LESS or just reg CSS files **/
        less: [
            'vendor/angular/angular-csp.css',
            'vendor/bootstrap/less/bootstrap.less'
        ],
        assets: []
    }
};