'use strict';

const assert = require('assert');
const ricket = require('../ricket');

describe('Ricket', function() {
    
    describe('#add()', function() {

        it('return self for easy chaining', function() {
        	
        	let e = undefined;
        	
        	try {

            	ricket.add().add().add();

            } catch (ex) {

            	e = ex;
                console.log(e);
            	
            }

            assert(e == undefined);
        });
    });

    describe('#add()', function() {

        it('should add each type of task', function() {
            
            let e = undefined;
            
            try {
                
                ricket.clear()
                ricket.add([function(args, next) {

                    return next(true);

                }, '/Users/Home/Documents/dev/General\ Projects/ricketjs/test/bat/first.sh ', {

                    path: '/Users/Home/Documents/dev/General\ Projects/ricketjs/test/bat/second.sh'

                } ]);

            } catch (ex) {

                e = ex;
                console.log(e);
                
            }

        });
    });

    describe('#run()', function() {

        it('It should execute each middleware/script in the config', function() {
            
            let e = undefined;
            
            try {
                
                ricket.clear()
                ricket.add([function(args, next) {

                    return next(true);

                }, '/Users/Home/Documents/dev/General\ Projects/ricketjs/test/bat/first.sh', {

                    path: '/Users/Home/Documents/dev/General\ Projects/ricketjs/test/bat/second.sh'

                } ]);

                ricket.run();

            } catch (ex) {

                e = ex;
                console.log(e);
                
            }

            assert(e == undefined);

        });
    });

    describe('#run()', function() {

        it('Should execute a seriese of functions, passing the output as expected', function() {
            
            let e = undefined;
            
            try {
                
                ricket.clear()
                ricket.add(function(args, next) {

                    next('first');

                }, function(args, next) {

                    assert(args[0] === 'first');
                    args.push('second');
                    console.log(args);

                    next(args);

                }, function(args, next) {

                    assert(args[0] === 'first');
                    assert(args[1] === 'second');
                    console.log(args);

                    next(args);

                });

                ricket.run();

            } catch (ex) {

                e = ex;
                console.log(e);
                
            }

            assert(e == undefined);

        });
    });

    describe('#run()', function() {

        it('It should execute in order and pass results properly', function() {
            
            let e = undefined;
            
            try {
                
                ricket.clear()

                ricket.add([function(args, next) {

                    console.log('starting')
                    return next(true);

                }, {

                    path: '/Users/Home/Documents/dev/General\ Projects/ricketjs/test/bat/first.sh',
                    args: []

                }, function(args, next) {

                    console.log(args.toString());
                    next(args);

                }]);

                ricket.run();

            } catch (ex) {

                e = ex;
                console.log(e);
                
            }

            assert(e == undefined);

        });
    });

    describe('#options()', function() {

        it('Should set and reset error handler as expected', function() {
            
            let e = undefined;
            
            try {
                
                ricket.clear();

                let errHandled = false;
                ricket.options({
                    errorHandler: function(st){
                        errHandled = true;
                    }
                });

                ricket.options({
                    beforeEach: 'breakIt'
                });

            } catch (ex) {

                e = ex;
                console.log(e);
                
            }

            try {

                ricket.clear();
                ricket.options({
                    afterEach: 'breakIt'
                });

            } catch (ex) {
                e = ex;
            }

            assert(e);

        });
    });

});