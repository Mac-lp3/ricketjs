'use strict';

const assert = require('assert');
const validate = require('../js/validate');

describe('validate', function() {
    
    describe('#filePath()', function() {

        it('Should interpret each type', function() {
        	
        	let e = undefined;
        	
        	try {

            	validate.filePath('test\\path');

            } catch (ex) {

            	e = ex;
                console.log(e);
            	
            }

            assert(e == undefined);
            
        });
    });

    describe('#descriptor()', function() {

        it('Validate an object descriptor of an executable', function() {
            
            let e = undefined;
            
            try {

                validate.descriptor({name: 'test name'});

            } catch (ex) {

                e = ex;
                console.log(e);
                
            }

            assert(e == undefined);
            
        });
    });
});