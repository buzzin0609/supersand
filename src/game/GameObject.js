import requiredProps from '../utils/requiredProps';

const gameRequired = [
	'character'
];

const gameDefaults = function() {
	return {
		id : `saveGame${Date.now()}`,
		saveName : `saveGame${Date.now()}`,
		stage : 1
	};
};

export default class GameObject {
	constructor(args) {
		requiredProps(gameRequired, args);
		Object.assign(this, gameDefaults(), args);
	}
}
