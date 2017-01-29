import Enemy from './Enemy';
import Utils from '../../utils/utils';

const Goon = function() {
	return new Enemy({
		name : 'Goon',
		imgUrl : 'enemies/enemy-master-sprite-sheet.png',
		profilePic : 'gok-port-ss.png',
		attributes : {
			'speed' : Utils.toFixed(Utils.randomFloat(1,3), 2)
		},
		frames : [
			'3,8,8,8,8,8',
			'3,8,8,8,8,8',
			'3,8,8,8,8,8',
			'3,8,8,8,8,8',
			'5,5,5,5',
			'5,5,5,5',
			'5,5,5,5',
			'5,5,5,5'
		],
		width : 32,
		height : 32,
		startX : Utils.toFixed(Utils.randomFloat(0.2,0.8), 1),
		startY : Utils.toFixed(Utils.randomFloat(0.6,0.8), 1),
		srcLocations : {
			'up' : 1,
			'right' : 3,
			'down' : 0,
			'left' : 2,
			'normal' : 0,
			'attack' : {
				'up' : 5,
				'right' : 7,
				'down' : 4,
				'left' : 6
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

export default Goon;
