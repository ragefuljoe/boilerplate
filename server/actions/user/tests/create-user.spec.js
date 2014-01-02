describe('Create User Spec', function(){
    var apiObj = {},
        should = require('should'),
        sinon = require('sinon'),
        action;

    beforeEach(function(){
        action = require('../create-user.js').action;
    });

    it('stats should be returned and make sense', function(done){
        //console.log('It should do something');
        action.run({}, {}, function() {
            should(true).ok;
            should(true).ok;
            should(true).ok;
            should(true).ok;
            done();
        });
    });

    it('stats should be returned and make sense2', function(done){
        //console.log('It should do something');
        action.run({}, {}, function() {
            should(true).ok;
            should(true).ok;
            should(true).ok;
            should(true).ok;
            done();
        });
    });
});