import GameActor from '../GameActor';

const Trunks = function(args = false) {

	class TrunksCharacter extends GameActor {

	}
	let fullArgs = Object.assign({
		name : 'Trunks',
		imgUrl : 'characters/trunks.png',
		profilePic : 'characters/trunks-profile.png',
		attributes : {
			'speed' : 1.5,
			'strength': 10
		},
		frames : [
			'2,8,8,8,8',
			'5,5,5,5',
			'5,5,5,5',
			'5,5,5,5',
			'5,5,5,5,5,5,5',
			'2,8,8,8,8',
			'5,5,5,5',
			'5,5,5,5',
			'5,5,5,5',
			'5,5,5,5,5,5,5',
			'2,8,8,8,8',
			'5,5,5,5',
			'5,5,5,5',
			'5,5,5,5',
			'5,5,5,5,5,5,5',
			'2,8,8,8,8',
			'5,5,5,5',
			'5,5,5,5',
			'5,5,5,5',
			'5,5,5,5,5,5,5',
			'5,5,5,5'
		],
		width : 30,
		height : 35,
		startX : 0.5,
		startY : 0.25,
		srcLocations : {
			'up': 10,
			'right': 5,
			'down': 0,
			'left': 15,
			'normal': 0,
			'dying': 20,
			'attack': {
				'up': 11,
				'right': 6,
				'down': 1,
				'left': 16
			},
			'attack2': {
				'up': 12,
				'right': 7,
				'down': 2,
				'left': 17
			},
			'attack3': {
				'up': 13,
				'right': 8,
				'down': 3,
				'left': 18
			},
			'attack4': {
				'up': 14,
				'right': 9,
				'down': 4,
				'left': 19
			}
		}
	}, args);

	return new TrunksCharacter(fullArgs);
};

export default Trunks;
