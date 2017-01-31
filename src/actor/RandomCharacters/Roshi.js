import Actor from '../Actor';

const Goon = function() {
	return new Actor({
		name: 'Roshi',
		imgUrl : 'characters/roshi.png',
		profilePic : 'gok-port-ss.png',
		attributes : {
			'speed' : Utils.toFixed(Utils.randomFloat(1,3), 2)
		},
		frames : [
			'70,8,8,8'
		],
		width : 32,
		height : 32,
		startX : startX || Utils.toFixed(Utils.randomFloat(0.2,0.8), 1),
		startY : startY || Utils.toFixed(Utils.randomFloat(0.6,0.8), 1),
		srcLocations : {
			'up' : 1,
			'right' : 3,
			'down' : 0,
			'left' : 2,
			'normal' : 0
		},

	});
};

export default Goon;
