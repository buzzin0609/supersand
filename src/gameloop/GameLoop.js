import On from '../utils/On';

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
			On.set('next-level', this.clear.bind(this));
			On.set('clear-game-loop', this.clear.bind(this));

			return Instance;
		}

		register(key, cb) {
			if (this.callbacks[key]) {
				console.warn(`callback: ${key} already defined. Please use a unique key`);
				return;
			}
			this.callbacks[key] = cb;
		}

		registerOnce(key, cb) {
			this.register(`${key}__once`, cb);
		}

		unregister(key) {
			let {callbacks} = this;

			if (!callbacks[key]) {
				console.warn(`callback: ${key} doesn't exist`);
				return;
			}
			callbacks[key] = null;
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
				if (keys[i].includes('__once')) {
					this.unregister(keys[i]);
				}
			}
		}
	};
}());



module.exports = new Singleton();
