var action = {};

action.name = "create-user";
action.description ="create-user";
action.inputs = {
    required: [],
    optional: [],
};
action.version = 1.0;
action.outputExample = {};
action.run = function(api, connection, next){
    var randNumber = Math.floor((Math.random()*10)+1);
    console.log('Create User Action Fired', connection.params);
    if ( randNumber > 5) {
        connection.response = {
            id: 345678,
            name: 'Chris Antoine',
            rand: randNumber
        };
    } else {
        connection.error = {
            message: 'Something went wrong',
            rand: randNumber
        };
    }

    next(connection, true);
}

exports.action = action;