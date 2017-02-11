var Singleton = (function () {
	var Instance = false;
	return class GameLoop {
		constructor() {
			if (!Instance) {
				Instance = this;
			}

			this.callbacks = {};
			this.raf = false;
			this.running = false;
			this.clear.bind(this);
			this.start.bind(this);

			return Instance;
		}

		register(key, cb) {
			if (this.callbacks[key]) {
				console.warn(`callback: ${key} already defined. Please use a unique key`);
				return;
			}
			this.callbacks[key] = cb;
		}

		unregister(key) {
			let {callbacks} = this;

			if (!callbacks[key]) {
				console.warn(`callback: ${key} doesn't exist`);
				return;
			}

			delete callbacks[key];

			if (!Object.keys(callbacks).length) {
				this.stop();
			}
		}

		clear() {
			this.callbacks = {};
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
			for (let i = 0,
					 cbs = this.callbacks,
					 keys = Object.keys(cbs),
					 l = keys.length;
				 i < l; i++) {
				cbs[keys[i]].call(cbs[keys[i]]);
			}
		}
	};
}());


module.exports = new Singleton();
