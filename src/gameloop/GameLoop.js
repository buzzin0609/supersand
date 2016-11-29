
var GameLoop = (function() {
	var Instance = false;
	return class GameLoop {
		constructor() {
			if (!Instance) {
				Instance = this;
			}

			this.callbacks = [];
			this.raf = false;

			return Instance;
		}

		register(cb) {
			this.callbacks.push(cb);
			console.log(this);
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
		}

		stop() {
			cancelAnimationFrame(this.raf);
		}

		loop() {
			this.raf = requestAnimationFrame(this.loop.bind(this));
			this.callbacks.forEach(cb => cb.call(cb));
		}
	};
}());


module.exports = new GameLoop();
