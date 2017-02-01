import Actor from '../Actor';

const Roshi = function(startX, startY) {
	return new Actor({
		name: 'Roshi',
		imgUrl : 'characters/roshi.png',
		profilePic : 'gok-port-ss.png',
		attributes : {
			'speed' : 1
		},
		frames : [
			'220,20,80,20'
		],
		width : 23,
		height : 30,
		startX : startX ? startX : 0.3,
		startY : startY ? startY : 0.2,
		srcLocations : {
			'up' : 1,
			'right' : 3,
			'down' : 0,
			'left' : 2,
			'normal' : 0
		},

	});
};

export default Roshi;
