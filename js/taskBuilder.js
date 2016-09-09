'use strict';

const utils = require('./utils');
const fs = require('fs');
const spawn = require('child_process').spawnSync;

module.exports = (function() {

	const globalBeforeFunctions = [];
	const globalAfterFunctions = [];
	const globalBeforeEachFunctions = [];
	const globalAfterEachFunctions = [];
	const orderedTaskList = [];

	const globalErrorHandler = (ex) => {
		throw ex;
	};

	const buildTask = (descriptor) => {

		const newTask = {};
		newTask.befores = globalBeforeEachFunctions;
		newTask.errorHandler = globalErrorHandler;

		if (utils.isFunction(descriptor)) {

			// this is a middleware function
			newTask.name = descriptor.name;
			newTask.command = descriptor;
			newTask.afters = globalAfterEachFunctions;

		} else if (utils.isObject(descriptor)) {

			// this is an executable configuration
			newTask.name = descriptor.name;
			newTask.command = buildExecutableCommand(descriptor);

			// custom before runs LAST in before list
			if (descriptor.before) {

				if(utils.isFunction(descriptor.before)) {

					newTask.befores.push(descriptor.before);

				} else {
					globalErrorHandler('provided before function is not a function.');
				}
			}

			// custom after runs FIRST in after list
			if (descriptor.after) { 

				if (utils.isFunction(descriptor.after)) {

					newTask.afters = [descriptor.after];
					newTask.afters = newTask.afters.concat(globalAfterEachFunctions);
				} else {
					globalErrorHandler('provided after function is not a function.');
				}

			} else {
				newTask.afters = globalAfterEachFunctions;
			}

		} else if (utils.isString(descriptor)) {

			// this is a path to an executable
			newTask.name = utils.getBaseFileName(descriptor);
			newTask.command = buildExecutableCommand(descriptor);
			newTask.afters = globalAfterEachFunctions;
			
		}

		orderedTaskList.push(newTask);

	};

	const buildExecutableCommand = (descriptor) => {

		let pathToExe = '';
		let givenArguments = [];

		// get the path to the executable
		if (utils.isString(descriptor)) {

			// if descriptor is a string, then use it
			pathToExe = descriptor;

		} else {

			// if this is an object, extract the pathand  arguments
			pathToExe = descriptor.path;
			givenArguments = descriptor.args;
		}


		const command = function(args, next) {

			// add the additional arguments, if any
			args = args.concat(descriptor.givenArguments);

			const out = spawn(path, args);

			// check for errors and throw if found.
			if (out.stderr && out.stderr.length != 0) {
				throw out.stderr.toString();
			}

			if (out.error) {
				throw out.error
			}

			// return output otherwise.
			return next(out.output);

		};

		return command;

	};

	const clearAll = () => {

		orderedTaskList.length = 0;
		globalAfterFunctions.length = 0;
		globalBeforeFunctions.length = 0;
		globalAfterEachFunctions.length = 0;
		globalBeforeEachFunctions.length = 0;

	};

	const getOrderedTaskList = () => {
		return orderedTaskList;
	};


	return {
		buildTask: buildTask,
		clearAll: clearAll,
		getTaskList: getOrderedTaskList
	};

})();