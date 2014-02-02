exports.mongoose = function(api, next){
    /*var mongoose = require('mongoose'),
        validator = require('mongoose-validator'),
        host = api.config.mongoose.host || 'localhost',
        port = api.config.mongoose.port || '27017',
        db = api.config.mongoose.db;

    mongoose.connect('mongodb://' + host + ':' + port + '/' + db);
    mongoose.models.User = require('../models/user.js')(mongoose, null, validator);

    api.mongoose = mongoose;

    api.mongoose._stop = function(api, next) {
        console.log('Tear Down');
        api.mongoose.disconnect();
        api.mongoose.models = {};
        next();
    };*/

    next();
};