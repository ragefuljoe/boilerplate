module.exports = function(lineman) {
    return {
        config: {
            loadNpmTasks: lineman.config.application.loadNpmTasks.concat("grunt-mocha-test"),
            prependTasks: {
                spec: ["mochaTest"]
            },
            mochaTest: {
                test: {
                    src: ['server/tests/**/*.spec.js'],
                    options: {
                        reporter: 'spec',
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