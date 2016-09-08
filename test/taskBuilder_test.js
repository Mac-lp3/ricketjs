'use strict';

const assert = require('assert');
const taskBuilder = require('../js/taskBuilder');

describe('taskBuilder', function() {
    
    describe('#buildTask()', function() {

        it('Should interpret each type', function() {
        	
        	let e = undefined;
        	
        	try {

            	taskBuilder.buildTask('test\\path');
            	taskBuilder.buildTask({name: 'test name'});
            	taskBuilder.buildTask(function testFunction() {
            		return true;
            	});

            } catch (ex) {

            	e = ex;
                console.log(e);
            	
            }

            assert(e == undefined);
            
        });
    });
});