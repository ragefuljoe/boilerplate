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
        grunt.registerTask('clearCache','Clear the actionHero cache',
            function(){
                var done = this.async();

                init(
                    function(api) {
                        api.cache.clear(function(error, count){
                            if(error) throw error
                            grunt.log.writeln('cleared ' + count + ' items from the cache');
                            done();
                        });
                    }
                );
            }
        )
    );

    tasks.push(
        grunt.registerTask('dumpCache','Save the current cache as a JSON object (:file)',
            function(file){
                var done = this.async();

                init(
                    function(api) {
                        if(undefined === file){
                            file = 'cache.dump'
                        }

                        api.cache.dumpWrite(file, function(error, count){
                            if(error) throw error
                            grunt.log.writeln('dumped ' + count + ' items from the cache to ' + file);
                            done();
                        });
                    }
                );
            }
        )
    );

    tasks.push(
        grunt.registerTask('loadCache','Set the cache from a file (overwrites existing cache) (:file)',
            function(file){
                var done = this.async();

                init(
                    function(api) {
                        if(file == null){
                            file = 'cache.dump'
                        }

                        api.cache.dumpRead(file, function(error, count){
                            if(error) throw error
                        
                            grunt.log.writeln('cleared the cache and then loaded ' + count + ' items from ' + file);
                            done();
                        });
                    }
                );
            }
        )
    );

    return tasks;
};