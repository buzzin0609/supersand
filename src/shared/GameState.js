import _  from './Private';

var GameState = (function() {
	var Instance = false;
	var data = {};
	class GameState {
		constructor() {
			if (!Instance) {
				Instance = this;
			}
			var privateProperties = {
				character : false,
				started : false
			};
			_.set(this, privateProperties);

			this.events = {};
			this.start.bind(this);
			this.stop.bind(this);
			return Instance;
		}

		get hasStarted() { return _.get(this).started; }

		get character() {
			return _.get(this).character;
		}

		set character(character) {
			_.get(this).character = character;
		}

		get(name) {
			return data[name];
		}

		set(name, value) {
			data[name] = value;
		}

		addTo(name, value) {
			if (!data[name]) {
				data[name] = [];
			}
			data[name].push(value);
		}

		start() {
			console.log('start triggered');
			_.get(this).started = true;
			this.trigger('start');
		}

		stop() {
			console.log('stop triggered');
			_.get(this).started = false;
			this.trigger('stop');
		}

		on(evt, cb) {
			if (this.hasStarted) {
				cb();
			}
			evt.split(' ').forEach(e => {
				if (this.events[e]) {
					this.events[e].push(cb);
				} else {
					this.events[e] = [cb];
				}
			});
		}

		trigger(evt) {
			if (this.events[evt]) {
				this.events[evt].forEach(cb => cb.call(cb));
			} else {
				console.error('Event type not in GameState');
			}
		}
	}
	return new GameState();
}());

module.exports = GameState;
