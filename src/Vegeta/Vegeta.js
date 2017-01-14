import KeyboardActor from '../actor/KeyboardActor';

const Vegeta = function() {
	return new KeyboardActor({
		name : 'Vegeta',
		imgUrl : 'vegeta-walking.png',
		profilePic : 'veg-port.png',
		attributes : {
			'speed' : 3
		},
		frames : [
			'2,8,8,8,8,8,8,8',
			'2,8,8,8,8,8,8,8,8,2',
			'2,8,8,8,8,8,8,8,8,2',
			'2,8,8,8,8,8,8,8,2',
			'40,8'
		],
		frameLen : 8,
		frameTicks : 10,
		width : 18,
		height : 35,
		startX : 0.5,
		startY : 0.6,
		srcLocations : {
			'up' : 3,
			'right' : 1,
			'down' : 0,
			'left' : 2,
			'normal' : 4
		}
	});
};

export default Vegeta;
