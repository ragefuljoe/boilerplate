exports.auth = function(api, next) {
    var requireAuth = function(connection, actionTemplate, next) {
            var req = connection.rawConnection.req;
            next(connection, true);
            return;
            /*console.log('Auth Params: ', connection.params);
            if (actionTemplate.auth) {

                // Check Headers
                if (req.headers && req.headers.authorization) {
                    var parts = req.headers.authorization.split(' ');

                    if (parts.length == 2) {
                        var scheme = parts[0],
                            credentials = parts[1];

                        if (/^Bearer$/i.test(scheme)) {
                            api.mongoose.models.User.findByToken(credentials)
                                .then(
                                    function(data) {
                                        if (data) {
                                            return next(connection, true);
                                        } else {
                                            connection.error = 'Authentication Failed';
                                            return next(connection, false);
                                        }
                                    },
                                    function(err) {
                                        connection.err = err;
                                        return next(connection, false);
                                    }
                                );
                        }

                    } else {
                        connection.error = 'Authentication Failed';
                        return next(connection, false);
                    }

                } else {
                    connection.error = 'Authentication Failed';
                    return next(connection, false);
                }

            } else {
                next(connection, true);
            }*/
        };

    api.actions.preProcessors.push(requireAuth);
    next();
};