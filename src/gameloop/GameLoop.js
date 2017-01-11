
var Singleton = (function() {
	var Instance = false;
	return class GameLoop {
		constructor() {
			if (!Instance) {
				Instance = this;
			}

			this.callbacks = [];
			this.raf = false;
			this.running = false;
			this.clear.bind(this);
			this.start.bind(this);

			return Instance;
		}

		register(cb) {
			this.callbacks.push(cb);
		}

		unregister(cb) {
			var callbacks = this.callbacks;
			var index = callbacks.indexOf(cb);
			callbacks.splice(index, 1);
			if (!callbacks.length) {
				this.stop();
			}
		}

		clear() {
			this.callbacks = [];
			this.stop();
		}

		start() {
			this.raf = requestAnimationFrame(this.loop.bind(this));
			this.running = true;
		}

		stop() {
			cancelAnimationFrame(this.raf);
			this.running = false;
		}

		loop() {
			this.raf = requestAnimationFrame(this.loop.bind(this));
			this.callbacks.forEach(cb => cb.call(cb));
		}
	};
}());


module.exports = new Singleton();
