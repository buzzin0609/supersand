
var Events = (function() {
	var events = {};

	return class Events {
		on(evt, thisArg, cb) {
			if (!events[evt]) {
				events[evt] = [cb];
				window.addEventListener(evt, function on(e) {
					events[evt].forEach(cb => cb.call(thisArg, e));
				});
			} else {
				events[evt].push(cb);
			}
		}

		off(evt, cb) {
			var index = events[evt].indexOf(cb);
			events[evt].splice(index, 1);
		}
	};
}());

export default new Events();
