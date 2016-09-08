'use strict';

const assert = require('assert');
const validate = require('../js/validate');

describe('validate', function() {
    
    describe('#buildTask()', function() {

        it('Should interpret each type', function() {
        	
        	let e = undefined;
        	
        	try {

            	validate.filePath('test\\path');
            	validate.descriptor({name: 'test name'});

            } catch (ex) {

            	e = ex;
                console.log(e);
            	
            }

            assert(e == undefined);
            
        });
    });
});