'use strict';

const assert = require('assert');
const validate = require('../js/validate');

describe('validate', function() {
    
    describe('#filePath()', function() {

        it('Should interpret each type', function() {
        	
        	let e = undefined;
            let isValid = true;
        	
        	try {

            	isValid = validate.filePath('test\\path');
                assert(!isValid);
                isValid = true;

                isValid = validate.filePath('');
                assert(!isValid);

                isValid = validate.filePath('test\\path\\name.txt');
                assert(isValid);

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
            let isValid = true;
            
            try {

                isValid = validate.descriptor({path: 'test\\path'});
                assert(!isValid);
                isValid = true;

                isValid = validate.descriptor({what: 'test\\path'});
                assert(!isValid);

                isValid = validate.descriptor({path: 'test\\path\\.txt'});
                assert(isValid);

            } catch (ex) {

                e = ex;
                console.log(e);
                
            }

            assert(e == undefined);
            
        });
    });
});