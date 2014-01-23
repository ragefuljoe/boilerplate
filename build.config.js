module.exports = {
    build_dir: 'build',
    compile_dir: 'bin',
    app_files: {
        js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
        jsunit: [ 'src/**/*.spec.js' ],

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
        css: [],
        assets: []
    }
};