
var On = (function() {
	var events = {};

	return class On {
		set(evt, cb) {
			events[evt] = cb;
		}

		trigger(evt, args) {
			events[evt].call(events[evt], args);
		}
	};
}());


export default new On();
