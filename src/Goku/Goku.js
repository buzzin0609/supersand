
import GameActor from '../actor/GameActor';

const Goku = function(args = false) {

	if (args) {
		return new GameActor(args);
	}

	return new GameActor({
		name : 'Goku',
		imgUrl : 'goku-normal-sheet.png',
		profilePic : 'gok-port-ss.png',
		attributes : {
			'speed' : 3
		},
		frames : [
			'2,50,8',
			'20,20',
			'3,20,20',
			'3,20,20',
			'3,20,20',
			'5,5,5,5',
			'5,5,5',
			'5,5,5',
			'5,5,5',
			'5,5,5'
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
			'normal' : 0,
			'attack' : {
				'up' : 7,
				'right' : 9,
				'down' : 6,
				'left' : 8
			}
		}
	});
};

export default Goku;
