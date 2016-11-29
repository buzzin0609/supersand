
var Characters = (function() {
	var characterList = {};
	var Instance = false;
	return class Characters {
		constructor() {
			if (!Instance) {
				Instance = this;
			}
			return Instance;
		}
		add(Character) {
			characterList[Character.name] = Character;
		}
		get(name) {
			return characterList[name];
		}
	};
}());

export default new Characters();
