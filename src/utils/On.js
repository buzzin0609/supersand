
var Singleton = (function() {
	var events = {};
	var Instance = false;
	return class On {

		constructor() {
			if (!Instance) {
				Instance = this;
			}
			return this;
		}

		set(evt, cb) {
			events[evt] = cb;
		}

		trigger(evt, args) {
			events[evt].call(events[evt], args);
		}
	};
}());


export default new Singleton();
