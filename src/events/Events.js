
var Events = (function() {
	var events = {};

	return class Events {
		on(evt, cb) {
			let timestamp = Date.now();
			if (!events[evt]) {
				events[evt] = {};
				window.addEventListener(evt, function on(e) {
					let event = events[evt];
					console.log(event);
					Object.keys(event).forEach(cb => {
						event[cb].call(event[cb], e);
					});
				});
			}
			events[evt][timestamp] = cb;
			console.log('registering event', events[evt]);
			return timestamp;
		}

		off(evt, timestamp) {
			console.log(events[evt], timestamp);
			delete events[evt][timestamp];
		}
	};
}());

export default new Events();
