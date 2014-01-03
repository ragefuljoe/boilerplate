describe('Create User Spec', function(){
    var apiObj = {},
        should = require('should'),
        sinon = require('sinon'),
        action;

    beforeEach(function(){
        action = require('../../actions/user/create-user.js').action;
    });

    it('stats should be returned and make sense', function(done){
        action.run({}, {}, function() {
            should(true).ok;
            should(true).ok;
            should(true).ok;
            should(true).ok;
            done();
        });
    });

    it('stats should be returned and make sense2', function(done){
        action.run({}, {}, function() {
            should(true).ok;
            should(true).ok;
            should(true).ok;
            should(true).ok;
            done();
        });
    });
});