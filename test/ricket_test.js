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

                }, 'someTask.exe', {

                    path: 'someOtherTask.exe'

                } ]);

            } catch (ex) {

                e = ex;
                console.log(e);
                
            }

            assert(e == undefined);
        });
    });
});