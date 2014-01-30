process.env.project_root = process.cwd() + '/server/';

exports._setup = {
    serverPrototype: require('actionhero').actionheroPrototype,
    testUrl:         'http://127.0.0.1:9000/api',
    init: function(callback){
        var self = this;
        if(self.server == null){
            self.server = new self.serverPrototype();
            self.server.start({
                    project_root: './',
                    configChanges: {
                        logger: {
                            transports: null
                        },
                        servers: {
                            'web' : {
                                port: 9000
                            }
                        }
                    }
                },
                function(err, api){
                    self.api = api;
                    callback();
                }
            );
        } else {
            self.server.restart(function(){
                callback();
            });
        }
    }
};