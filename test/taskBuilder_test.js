'use strict';

const assert = require('assert');
const taskBuilder = require('../js/taskBuilder');
const utils = require('../js/utils');

describe('taskBuilder', function() {
    
    describe('#buildTask()', function() {

        it('Should interpret each type', function() {
        	
        	let e = undefined;
        	
        	try {

                taskBuilder.clearAll();
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
            assert(3 == taskBuilder.getTaskList().length);
            
        });
    });

    describe('#buildTask()', function() {

        it('Should build task object as expected', function() {
            
            let e = undefined;
            
            try {

                let returnTrue = function () {
                    return true;
                };

                // Test build middleware
                taskBuilder.clearAll();
                taskBuilder.buildTask(returnTrue);
                let task = taskBuilder.getTaskList()[0];

                assert(task.hasOwnProperty('name'));
                assert(task.hasOwnProperty('command'));
                assert(task.command == returnTrue);
                assert(Array.isArray(task.befores));
                assert(task.befores.length === 0);
                assert(Array.isArray(task.afters));
                assert(task.afters.length === 0);

                // test build from string
                taskBuilder.clearAll();
                taskBuilder.buildTask('path/to/exe.exe');
                task = taskBuilder.getTaskList()[0];

                assert(task.hasOwnProperty('name'));
                assert(task.hasOwnProperty('command'));
                assert(utils.isFunction(task.command));
                assert(Array.isArray(task.befores));
                assert(task.befores.length === 0);
                assert(Array.isArray(task.afters));
                assert(task.afters.length === 0);

                // test building from object
                taskBuilder.clearAll();
                taskBuilder.buildTask({
                    name: 'testName',
                    path: 'path/to/exe.exe'
                });
                task = taskBuilder.getTaskList()[0];

                assert(task.name == 'testName');
                assert(task.hasOwnProperty('command'));
                assert(utils.isFunction(task.command));
                assert(Array.isArray(task.befores));
                assert(task.befores.length === 0);
                assert(Array.isArray(task.afters));
                assert(task.afters.length === 0);

            } catch (ex) {

                e = ex;
                console.log(e);
                
            }

            assert(e == undefined);
            
        });
    });
});