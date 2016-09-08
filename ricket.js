'use strict';

const util = require('./js/utils');
const taskBuilder = require('./js/taskBuilder');

module.exports = (function() {

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

	const execute = () => {

	};

	const interfaze = {
		add: add,
		options: configure,
		run: execute
	};

	return interfaze;

})();