var Utils = require('./utils');

function requiredProps(arr, obj) {
	arr.forEach(function(key) {
		if (!obj[key]) {
			throw new Error(['Missing required parameter on args object:', key].join(' '));
		}
	});
}

Utils.register('requiredProps', requiredProps);

export default requiredProps;
