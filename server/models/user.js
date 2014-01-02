module.exports = function(mongoose, encOptions) {
    var paginate = require('mongoose-utilities/lib/pagination'),
        q = require('q'),
        schema = mongoose.Schema(
            {
                name: {
                    first: { type: String, required: true },
                    last: { type: String, required: true }
                },
                email: { type: String, required: true },
                username: { type: String, required: true },
                hash: { type: String },
                salt: { type: String },
                role: { type: String, default: 'client' },
                active: { type: Boolean, default: false },
                archive: { type: Boolean, default: false },
                activation: {
                    token: { type: String }
                },
                access_token: {
                    key: { type: String },
                    expiration: { type: Date }
                },
                address: { type: String },
                address2: { type: String },
                city: { type: String },
                state: { type: String },
                zip: { type: String },
                phone: { type: String },
                folders: {
                    client: {
                        id: { type: String },
                        name: { type: String }
                    },
                    invoices: {
                        id: { type: String },
                        name: { type: String }
                    },
                    resources: {
                        id: { type: String },
                        name: { type: String }
                    },
                    prepared: {
                        id: { type: String },
                        name: { type: String }
                    }
                },
                parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
            },
            {
                id: false,
                toObject: {
                    getters: false,
                    virtuals: true
                },
                toJSON: {
                    getters: false,
                    virtuals: true
                }
            }
        ),
        passportLocalOptions = encOptions || {
            missingUsernameError: 'The %s field is required',
            missingPasswordError: 'The %s field is required',
            userExistsError: 'That username(%s) is already in use'
        },
        passportLocalMongoose = require('passport-local-mongoose'),
        user,
        permissions = {
            'admin': {
                '/api/users': [ 'GET' ],
                '/api/users/:id':[ '*' ],
                '/api/users/:id/read': [ 'GET', 'POST' ],
                '/api/users/:id/read/:uid': [ 'DELETE', 'PUT' ],
                '/api/users/:id/submissions': [ 'GET' ],
                '/api/questionnaires':[ 'GET', 'POST' ],
                '/api/questionnaires/:id':[ 'GET', 'PUT' ],
                '/api/submissions': [ '*' ],
                '/api/submissions/:id':[ 'GET' ],
                '/api/services': [ '*' ],
                '/api/services/:search': [ '*' ],
                '/api/messages': [ '*' ],
                '/api/messages/:id': [ '*' ],
                '/api/messages/:id/:label': [ 'PUT' ],
                '/api/invoices': [ '*' ],
                '/api/invoices/:id': [ '*' ],
                '/api/clients/:id/invoices': [ 'GET' ],
                '/api/clients/:id/invoice-files': [ 'GET' ],
                '/api/clients/:id/documents/:type': [ 'GET' ],
                '/api/clients': [ '*' ],
                '/api/clients/autocomplete': [ 'GET' ],
                '/api/clients/:id' : [ '*' ],
                '/api/clients/:id/set-folders': [ 'POST' ],
                '/api/box': [ '*' ],
                '/api/box/folder/:id': [ 'GET' ],
                '/api/box/verify': [ 'GET' ],
                '/api/box/authorize': [ 'GET' ],
            },
            'client': {
                '/api/users/:id/read/:uid': [ 'DELETE', 'PUT', 'GET' ],
                '/api/users/:id/read': [ 'GET', 'POST' ],
                '/api/users/:id': [ 'GET', 'PUT' ],
                '/api/users/:id/submissions': [ 'GET' ],
                '/api/messages': [ 'GET', 'POST' ],
                '/api/messages/:id': [ 'GET' ],
                '/api/messages/:id/:label': [ 'PUT' ],
                '/api/questionnaires/:id':[ 'GET' ],
                '/api/submissions':[ 'GET' ],
                '/api/submissions/:id':[ 'GET', 'PUT' ],
                '/api/activity': [ 'GET' ],
                '/api/documents/category/:type': [ 'GET' ],
                '/api/documents': [ 'GET' ],
                '/api/documents/download/:id': [ 'GET' ],
                '/api/documents/:id': [ 'GET' ],
                '/api/invoices/:id': [ 'GET' ],
                '/api/invoices/:id/payment': [ 'PUT' ]
            },
            'readonly': {
                '/api/users/:id': [ 'GET', 'PUT' ],
                '/api/messages': [ 'GET', 'POST' ],
                '/api/messages/:id': [ 'GET' ],
                '/api/messages/:id/:label': [ 'PUT' ]
            },
            'guest': {
                '/api/users': [ 'POST' ]
            }
        };

    schema.methods.can = function(resource, permission, cb) {
        if (!permissions[this.role][resource]) {
            return cb('Access not allowed');
        }
        if (permissions[this.role][resource].none(permission) && permissions[this.role][resource].none('*'))
        {
            return cb('Access not allowed');
        }

        return cb(null);
    };

    schema.statics.findByToken = function(token) {
        var expirationDate = new Date(),
            deferred = q.defer();

        expirationDate.setMinutes(expirationDate.getMinutes() + 15);
        
        this.findOneAndUpdate(
            {
                'access_token.key' : token/*,
                'access_token.expiration': {
                    $gte: new Date()
                }*/
            },
            {
                'access_token.expiration': expirationDate
            },
            function(err, user) {
                if (err) {
                    deferred.reject(err);
                    return;
                }

                deferred.resolve(user);
            }
        );

        return deferred.promise;
    };

    schema.virtual('name.full').get(function() {
        return this.name.first + ' ' + this.name.last;
    });

    schema.plugin(passportLocalMongoose, passportLocalOptions);
    schema.plugin(paginate, {
        defaultSort: { _id: -1 }
    });

    user = mongoose.model('User', schema);

    return user;
};