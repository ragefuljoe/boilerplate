var setup = require("../_setup.js")._setup,
    request = require("request"),
    should = require("should");

describe('integration', function(){  
    before(function(done){
        setup.init(done);
    });

    it("the api should work in general", function(done){
        request.get(setup.testUrl + "/someAction", function(err, response, body){
            body = JSON.parse(body);
            body.error.should.equal("Error: someAction is not a known action or that is not a valid apiVersion.");
            done();
        });
    });

    it("the api should throw an error", function(done){
        request.get(setup.testUrl + "/someAction", function(err, response, body){
            body = JSON.parse(body);
            body.error.should.equal("Error: someAction is not a known action or that is not a valid apiVersion.");
            done();
        });
    });
});