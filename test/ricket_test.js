'use strict';

const assert = require('assert');
const ricket = require('../ricket');

describe('Ricket', function() {
    
    describe('#add()', function() {

        it('return self for easy chaining', function() {
        	
        	let e = undefined;
        	
        	try{

            	ricket.add().add().add();

            } catch (ex) {

            	e = ex;
            	
            }

            assert(e == undefined);
        });
    });
});