'use strict';

const util = require('./utils');
const fs = require('fs');

module.exports = (function() {

	const globalBeforeFunctions = [];
	const globalAfterFunctions = [];
	const globalBeforeEachFunctions = [];
	const globalAfterEachFunctions = [];
	const orderedTaskList = [];

	const globalErrorHandler = function (ex) {
		throw ex;
	};

	const buildTask  = function(descriptor) {

		const newTask = {};

		if (util.isFunction(descriptor)) {

			// this is a middleware function
			newTask.name = descriptor.name;
			newTask.command = descriptor;
			newTask.befores = globalBeforeEachFunctions;
			newTask.afters = globalAfterEachFunctions;
			newTask.errorHandler = globalErrorHandler;

		} else if (util.isObject(descriptor)) {

			// this is an executable configuration

		} else if (util.isString(descriptor)) {

			// this is a path to an executable

		}

	};

	const buildExecutableCommand = function (descriptor) {

		// get name
		// assemple action () if not function
		// extract before/after
		let task = {};

	};

	const clearAll = function () {

		orderedTaskList.length = 0;
		globalAfterFunctions.length = 0;
		globalBeforeFunctions.length = 0;
		globalAfterEachFunctions.length = 0;
		globalBeforeEachFunctions.length = 0;

	};

	const getOrderedTaskList = function() {
		return orderedTaskList;
	};


	return {
		buildTask: buildTask,
		clearAll: clearAll,
		getTaskList: getOrderedTaskList
	};

})();