var Singleton = (function () {
	let events = {};
	let Instance = false;
	return class On {

		constructor() {
			if (!Instance) {
				Instance = this;
			}
			return this;
		}

		set(evt, cb) {
			let event = events[evt];
			if (!event) {
				events[evt] = [];
			}
			events[evt].push(cb);
		}

		trigger(evt, args) {
			if (!events[evt]) {
				return;
			}
			let i = events[evt].length;
			while (i--) {
				events[evt][i].call(events[evt][i], args);
			}
		}
	};
}());


export default new Singleton();
