import GameActor from '../actor/GameActor';

const Vegeta = function(args = false) {

	class Vegeta extends GameActor {
		setAttack() {
			super.setAttack();
			this.width += 6;
		}

		resetAttack() {
			super.resetAttack();
			this.width -= 6;
		}
	}

	if (args) {
		return new Vegeta(args);
	}
	
	return new Vegeta({
		name : 'Vegeta',
		imgUrl : 'vegeta-sheet-02.png',
		profilePic : 'veg-port.png',
		attributes : {
			'speed' : 3
		},
		frames : [
			'2,8,8,8,8,8,8,8',
			'2,8,8,8,8,8,8,8,8,2',
			'2,8,8,8,8,8,8,8,8,2',
			'2,8,8,8,8,8,8,8,2',
			'40,8',
			'3,5,7',
			'3,5,7',
			'3,5,5,7',
			'3,5,5,7',
			'3,5,5,7',
			'3,5,5,7',
			'3,5,7',
			'3,5,7'
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
			'normal' : 4,
			'punch' : {
				'up' : 9,
				'right' : 5,
				'down' : 7,
				'left' : 11
			}
		}
	});
};

export default Vegeta;
