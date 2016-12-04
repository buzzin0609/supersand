var Singleton = (function() {
	var Instance = false;
	var sceneObj = {};

	return class Scenes {

		constructor() {
			if (!Instance) {
				Instance = this;
			}
			return this;
		}

		register(key, Scene) {
			sceneObj[key] = Scene;
			return Scene;
		}

		unregister(key) {
			delete sceneObj[key];
		}

		get(key) {
			return sceneObj[key];
		}

	};

}());

module.exports = new Singleton();
