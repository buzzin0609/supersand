

var Scenes = (function() {
	var Instance = false;
	var sceneObj = {};
	var Constructor = function() {
		if (!Instance) {
			Instance = this;
		}
		return this;
	};

	var p = Constructor.prototype;

	p.register = function(key, Scene) {
		sceneObj[key] = Scene;
		return Scene;
	};

	p.unregister = function(key) {
		delete sceneObj[key];
	};

	p.get = function(key) {
		return sceneObj[key];
	};

	return Constructor;
}());

module.exports = new Scenes();
