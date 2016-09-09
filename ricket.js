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
				this.add(val);				
			});

		} else {

			// pass descriptor into action builder
			taskBuilder.buildTask(descriptor);
		}

		return interfaze;
	};

	const configure = (obj) => {

		return interfaze;
	};

	/*
	 * Core method that checks for next in the list, runs it, and manages
	 * argument transmission.
	 */
	const execute = (valsFromPrevious) => {

		// if current index == 0, just jump to befores.
		// if next index > list lenth, pass in end function.

		// get previous task.
		// does it have any afters?
		// run them, with valsFromPrevious, updating valsFromPrevious
		// get current task
		// any befores? 
		// run them, with valsFromPrevious, updating valsFromPrevious
		// update current task index.
		// run the command with valsFromPrevious.

	};

	const endExecution = (valsFromPrevious) => {
		return valsFromPrevious;
	},

	const resetState = () => {
		taskBuilder.clear();
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