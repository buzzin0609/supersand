
import GameActor from '../GameActor';

const Goku = function(args = false) {

	if (args) {
		return new GameActor(args);
	}

	return new GameActor({
		name : 'Goku',
		imgUrl : 'goku-normal-sheet.png',
		profilePic : 'gok-port-ss.png',
		attributes : {
			'speed' : 1.5,
			'strength': 10
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
			'5,5,5',
			'3,20,20',
			'5,5,5',
			'5,5,5,5',
			'5,5,5,5',
			'5,5,5',
			'5,5,5,5',
			'5,5,5,5',
			'5,5,5',
			'5,5,5,5',
			'5,5,5,5',
			'5,5,5',
			'5,5,5,5',
			'5,5,5,5',
			'5,5,5,5'
		],
		frameLen : 8,
		frameTicks : 10,
		width : 32,
		height : 32,
		startX : 0.5,
		startY : 0.25,
		srcLocations : {
			'up' : 2,
			'right' : 4,
			'down' : 1,
			'left' : 3,
			'normal' : 0,
			'dying': 10,
			'attack' : {
				'up' : 7,
				'right' : 9,
				'down' : 6,
				'left' : 8
			},
			'attack2' : {
				'up' : 20,
				'right' : 14,
				'down' : 11,
				'left' : 17
			},
			'attack3' : {
				'up' : 21,
				'right' : 15,
				'down' : 12,
				'left' : 18
			},
			'attack4' : {
				'up' : 22,
				'right' : 16,
				'down' : 13,
				'left' : 19
			},

		}
	});
};

export default Goku;
