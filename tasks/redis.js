module.exports = function(grunt) {
    var ActionheroPrototype = require('actionhero').actionheroPrototype;

    function init(fn) {
        process.env.project_root = grunt.config('server.dir');

        var actionHero = new ActionheroPrototype();

        actionHero.initialize(
            {
                configChanges: grunt.config('server.config')
            },
            function(err, api){
                fn(api);
            }
        );
    }
    
    var tasks = [];

    tasks.push(
        grunt.registerTask('flushRedis', 'Clear the entire actionHero redis database',
            function(){
                var done = this.async();

                init(
                    function(api) {
                        api.redis.client.flushdb(function(err){
                            if(err) throw err
                            grunt.log.writeln('Redis Flushed!');
                            done();
                        });
                    }
                );
            }
        )
    );

    return tasks;
};