var action = {};

action.auth = true;
action.name = "list-users";
action.description = "This action will return a list of users in the system";
action.inputs = {
    required: [],
    optional: [],
};
action.version = 1.0;
action.blockedConnectionTypes = [ 'web' ];
action.outputExample = {
    status: '',
    data: [],
    metadata: {}
};

action.run = function(api, connection, next){
    console.log(connection.type);
    /*var model = api.mongoose.models.User,
        pageNum = 1;

    model.paginate(
        {
            fields: 'name username _id',
            page: pageNum,
            limit: 20
        },
        function(err, users) {
            if (err) {
                connection.response = {
                    status: 'error',
                    data: err
                };
            } else {
                connection.response = {
                    status: 'success',
                    data: users.docs,
                    metadata: {
                        total: users.count,
                        page: users.page,
                        pages: users.pages,
                        perPage: users.limit
                    }
                };
            }

            next(connection, true);
        }
    );*/
    connection.response = { users: [ {id: 1, name: { first: 'Chris', last: 'Antoine' } } ] };
    next(connection, true);
}

exports.action = action;