module.exports = function(grunt) {
    var ActionHeroPrototype = require('actionhero').actionHeroPrototype;
    function init(fn) {
        process.env.project_root = grunt.config('actionHero.directory');

        var actionHero = new ActionHeroPrototype();

        actionHero.initialize(
            {
                configChanges: grunt.config('actionHero.config')
            },
            function(err, api){
                fn(api);
            }
        );
    }
    
    var tasks = [];

    tasks.push(
        grunt.registerTask('enqueuePeriodicTask','Enqueue a periodic task (:taskName)',
            function(taskName){
                init(
                    function(api) {
                        var done = this.async();

                        if(!api.tasks.tasks[taskName]) throw new Error('Task not found')
                        api.resque.startQueue(function(){
                            // enqueue to run ASAP
                            api.tasks.enqueue(taskName, function(err, toRun){
                                if(err) throw err
                                
                                if(toRun === true){
                                    grunt.log.writeln('loaded task: ' + taskName)
                                } else {
                                    grunt.log.writeln(taskName + ' not enqueued')
                                }
                                done();
                            });
                        });
                    }
                );
            }
        )
    );

    tasks.push(
        grunt.registerTask('enqueueAllPeriodicTasks','This will enqueue all periodic tasks (could lead to duplicates)',
            function(){
                init(
                    function(api) {
                        var done = this.async();

                        api.resque.startQueue(
                            function(){
                                api.tasks.enqueueAllRecurrentJobs(
                                    function(loadedTasks){
                                        grunt.log.writeln('loaded tasks: ' + loadedTasks.join(', '))
                                        done();
                                    }
                                );
                            }
                        );
                    }
                );
            }
        )
    );

    tasks.push(
        grunt.registerTask('stopPeriodicTask','Remove an enqueued periodic task (:taskName)',
            function(taskName){
                init(
                    function(api) {
                        var done = this.async();
                        if(!api.tasks.tasks[taskName]) throw new Error('Task not found')

                        api.resque.startQueue(
                            function(){
                                api.tasks.stopRecurrentJob(taskName, function(error, count){
                                    grunt.log.writeln('removed ' + count + ' instances of ' + taskName)
                                        done();
                                    }
                                );
                            }
                        );
                    }
                );
            }
        )
    );

    return tasks;
};