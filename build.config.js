module.exports = {
    build_dir: 'build',
    compile_dir: 'bin',
    server: {
        dir: process.cwd() + '/server',
        config: {
            logger: {
                transports: null
            }
        }
    },
    app_files: {
        manifest:'src/manifest.json',
        js: [
            'src/background.js',
            'src/**/!(spec|e2e)*.js',
            '!src/assets/**/*.js',
            '!src/spec/helpers/*.js'
        ],
        assets: [
            'src/assets/**/*'
        ],

        jsunit: [
            'src/app/**/spec.*.js'
        ],

        templates: [
            '**/*.tpl.html'
        ],

        html: [ 'src/index.html' ],
        less: 'src/less/main.less'
    },
    test_files: {
        client: {
            app:[
                'vendor/angular/angular.js',
                'src/app/**/!(spec|e2e)*.js'
            ],
            spec:[
                'vendor/angular-mocks/angular-mocks.js',
                'src/**/spec.*.js',
            ],
            e2e:[
                'src/**/e2e.*.js',
            ]
        },
        server: {
            spec:[
                '<%= server.dir %>/**/*.spec.js',
            ],
            e2e:[
                '<%= server.dir %>/**/*.e2e.js',
            ]
        }
    },
    vendor_files: {
        js: [
            'vendor/angular/angular.js',
            'vendor/angular-bootstrap/ui-bootstrap.min.js',
            'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',
            'vendor/angular-ui-utils/modules/route/route.js',
            // 'vendor/angular-ui-grid/ui-grid.js'
            'vendor/angular-smart-table/dist/smart-table.min.js',
            'vendor/d3/d3.min.js',
            'vendor/nvd3/nv.d3.min.js',
            'vendor/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.min.js'
        ],
        /** This can be LESS or just reg CSS files **/
        less: [
            'vendor/angular/angular-csp.css',
            'vendor/bootstrap/less/bootstrap.less',
            'vendor/nvd3/nv.d3.min.css'
            // 'vendor/angular-ui-grid/ui-grid.css'
        ],
        assets: [
            // 'vendor/angular-ui-grid/ui-grid.woff',
            // 'vendor/angular-ui-grid/ui-grid.ttf'
        ]
    }
};