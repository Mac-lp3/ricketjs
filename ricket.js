'use strict';

const util = require('./js/utils');
const taskBuilder = require('./js/taskBuilder');

module.exports = (function() {

	let currentTaskIndex = 0;

	/*
	 * single method to add middleware or a script
	 */
	const add = (descriptor) => {

		// check type of descriptor
		if (util.isArray(descriptor)) {

			// if array, recursive call for each member
			descriptor.map((val) => {
				add(val);				
			});

		} else {
			
			// pass descriptor into action builder
			taskBuilder.buildTask(descriptor);
		}

		return interfaze;
	};

	const configure = (obj) => {

		if (obj.beforeEach) {
			taskBuilder.addBeforeEach(obj.beforeEach);
		}

		if (obj.afterEach) {
			taskBuilder.addAfterEach(obj.afterEach);
		}

		if (obj.errorHandler) {
			taskBuilder.setErrorHandler(obj.errorHandler);
		}

		return interfaze;
	};

	/*
	 * Core method that checks for next in the list, runs it, and manages
	 * argument transmission.
	 */
	const execute = (valsFromPrevious) => {

		// TODO wrap valsFromPerevious

		// get the last task's after functions
		let afterFunctions = [];

		if (currentTaskIndex) {
			afterFunctions = taskBuilder.getTaskList()[currentTaskIndex - 1].afters;
		}

		let argsToPass = valsFromPrevious;
		afterFunctions.map((func) => {
			argsToPass = func(argsToPass);
		});

		// get the next task, or the termination task
		let nextTask = {};
		
		if (currentTaskIndex + 1 > taskBuilder.getTaskList().length) { 
			nextTask = taskBuilder.getTerminateTask();
		} else {
			nextTask = taskBuilder.getTaskList()[currentTaskIndex];
		}

		let befores = [];
		let beforeFunctions = nextTask ? nextTask.befores : [];

		beforeFunctions.map((func) => {
			argsToPass = func(argsToPass);
		});

		++currentTaskIndex;

		nextTask.command(argsToPass, execute);

	};

	const resetState = () => {
		taskBuilder.clearAll();
		currentTaskIndex = 0;
	};

	const interfaze = {
		add: add,
		options: configure,
		clear: resetState,
		run: execute
	};

	return interfaze;

})();