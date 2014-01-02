module.exports = function(lineman) {
    return {
        config: {
            loadNpmTasks: lineman.config.application.loadNpmTasks.concat("grunt-mocha-test"),
            prependTasks: {
                dev: lineman.config.application.prependTasks.dev.concat("mochaTest")
            },
            mochaTest: {
                test: {
                    src: ['server/**/*.spec.js'],
                    options: {
                        //reporter: 'spec',
                        log: true
                    }
                }
            },
            watch: {
                mocha: {
                  files: 'server/**/*.spec.js',
                  tasks: ["mochaTest"]
                }
            }
        }
    };
};