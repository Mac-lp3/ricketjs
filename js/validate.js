'use strict';

const utils = require('./utils');

module.exports = (function() {

	/*
	 * Returns true if the string is a fully quallified file name
	 */
	const validateFilePath = function(pathToValidate) {

	};

	/*
	 * Validates an executable descriptor object. Path is the only
	 * required field. If optional fields are present, it validates
	 * their type.
	 */
	const validateDescriptor = function(descriptorToValidate) {

		let isValid = false;

		// should delegate to validateFilePath();
		if (descriptorToValidate.hasOwnProperty('path')) {

			if (validateFilePath(descriptorToValidate.path)) {
				// valid
				isValid = true;
			}

			// check optional before/afters
			if (descriptorToValidate.hasOwnProperty('after')) {
				
				if (!util.isFunction(descriptorToValidate.after)){
					
					// invalid
					isValid = false;
				} 
			}

			if (descriptorToValidate.hasOwnProperty('before')) {
				
				if (!util.isFunction(descriptorToValidate.before)){
					
					// invalid
					isValid = false;
				} 
			}
		} 

		return isValid;
	};

	/*
	 * Validates options objects
	 */
	const validateOptions = function(optionsToValidate) {

	};

	return {
		options: validateOptions,
		filePath: validateFilePath,
		descriptor: validateDescriptor
	};

})();