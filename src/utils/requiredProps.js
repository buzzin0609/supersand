var Utils = require('./utils');
Utils.register('requiredProps', function(arr, obj) {
	arr.forEach(function(key) {
		if (!obj[key]) {
			throw new Error(['Missing required parameter on args object:', key].join(' '));
		}
	});
});
