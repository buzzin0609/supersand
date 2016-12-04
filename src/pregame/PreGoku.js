import KeyboardActor from '../actor/KeyboardActor';

export default new KeyboardActor({
	name : 'PreGoku',
	imgUrl : 'goku-normal-sheet.png',
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



// console.log(Actor1);
