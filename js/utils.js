'use strict';

module.exports = (function() {

	const wrapArguments = (args) => {

		if (isArray(args)) {
			
			return args;

		} else if (!args) {

			return [];

		} else {

			return [args];
		}

	};

	const getBaseFileName = (stringFilePath, includeExtention) => {

		let baseName = '';

		// using forward or backward slashes?
		if (stringFilePath.lastIndexOf('/') != -1) {

			// get everything after the last /
			baseName = stringFilePath.substring(stringFilePath.lastIndexOf('/') + 1);


		} else if (stringFilePath.lastIndexOf('\\') != -1) {

			// get everything after the last \
			baseName = stringFilePath.substring(stringFilePath.lastIndexOf('\\') + 1);
		}

		// cut off extention?
		if (!includeExtention) {
			baseName = baseName.substring(0, baseName.lastIndexOf("."));
		}

		return baseName;

	};

	const isObject = (varToCheck) => {
		return Object.prototype.toString.call(varToCheck) == '[object Object]';
	};

	const isString = (varToCheck) => {
		return Object.prototype.toString.call(varToCheck) == '[object String]';
	};

	const isArray = (varToCheck) => {
		return Object.prototype.toString.call(varToCheck) == '[object Array]';
	};

	const isFunction = (varToCheck) => {
		return Object.prototype.toString.call(varToCheck) == '[object Function]';
	};

	return {
		getBaseFileName: getBaseFileName,
		isArray: isArray,
		isObject: isObject,
		isString: isString,
		isFunction: isFunction,
		wrapArguments: wrapArguments
	};

})();