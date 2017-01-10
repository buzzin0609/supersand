import KeyboardActor from '../actor/KeyboardActor';

const Goku = function() {
	return new KeyboardActor({
		name : 'Goku',
		imgUrl : 'goku-normal-sheet.png',
		profilePic : 'gok-port-ss.png',
		attributes : {
			'speed' : 3
		},
		frames : [
			'2,100,8',
			'2,8',
			'3,2, 8, 8',
			'3,2, 20, 20',
			'3,2, 20, 20',
		],
		frameLen : 8,
		frameTicks : 10,
		width : 32,
		height : 32,
		startX : 0.5,
		startY : 0.6,
		srcLocations : {
			'up' : 2,
			'right' : 4,
			'down' : 1,
			'left' : 3,
			'normal' : 0
		}
	});
};

export default Goku;



// console.log(Actor1);
