var _ = require('./Private');
import Characters from './Characters';

var GameState = (function() {
	var Instance = false;
	return class GameState {
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

			return Instance;
		}

		get hasStarted() { return _.get(this).started; }

		get character() {
			return Characters.get(_.get(this).character);
		}

		set character(name) {
			_.get(this).character = name;
		}

		start() {
			console.log('start triggered');
			_.get(this).started = true;
			this.trigger('start');
		}

		on(evt, cb) {
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
	};
}());

module.exports = new GameState();
