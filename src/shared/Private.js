
var Private = (function() {
	var Instance = false;
	var entries = new WeakMap();
	return class Private {
		constructor() {
			if (!Instance) {
				Instance = this;
			}
			return this;
		}

		set(instance, props) {
			entries.set(instance, props);
		}

		get(instance) {
			return entries.get(instance);
		}
	};
}());


module.exports = new Private();
 
