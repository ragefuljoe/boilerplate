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
            'src/**/*.tpl.html'
        ],

        html: [ 'src/index.html' ],
        less: 'src/less/main.less'
    },
    test_files: {
        app:[
            'vendor/angular/angular.js',
            'src/app/**/!(spec)*.js'
        ],
        spec:[
            'vendor/angular-mocks/angular-mocks.js',
            'src/**/spec.*.js',
        ],
        e2e:[
            'src/**/e2e.*.js',
        ]
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