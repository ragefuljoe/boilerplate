var protractor = require('protractor');
require('protractor/jasminewd');
    
describe('Home module', function() {
    var ptor;
    describe('visiting the home page', function() {
        ptor = protractor.getInstance();

        beforeEach(function() {
            ptor.get('/');
        });

        describe('when we do something', function() {
            it('it should display nothing', function() {
                expect(true).toEqual(true);
            });

            it('it should display nothing', function() {
                expect(true).toEqual(true);
            });

            it('it should display nothing', function() {
                expect(true).toEqual(true);
            });

            it('it should display nothing', function() {
                expect(true).toEqual(true);
            });
        });
    });
});