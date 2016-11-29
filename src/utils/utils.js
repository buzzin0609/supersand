
var Utils = (function() {
	var Instance = false;

	var Utils = function() {
		if (!Instance) {
			Instance = this;
		}
		return Instance;
	};

	var p = Utils.prototype;

	p.register = function(key, cb) {
		p[key] = cb;
	};

	return Utils;
}());

module.exports = new Utils();
require('./registerUtils');
