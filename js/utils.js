'use strict';

module.exports = (function() {

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
		isArray: isArray,
		isObject: isObject,
		isString: isString,
		isFunction: isFunction
	};

})();