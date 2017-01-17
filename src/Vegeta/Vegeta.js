import GameActor from '../actor/GameActor';

const Vegeta = function(args = false) {
	let normalWidth = 18;
	let attackWidths = {
		attack : normalWidth + 6,
		attack3 : normalWidth + 12,
		attack4 : 31
	};
	class Vegeta extends GameActor {
		setAttack() {
			super.setAttack();
			if (['attack3', 'attack4'].includes(this.attackType) && ['left', 'right'].includes(this.facing)) {
				this.width = attackWidths[this.attackType];
				// debugger;
			} else {
				this.width = attackWidths.attack;
			}
		}

		resetAttack() {
			super.resetAttack();
			this.width = normalWidth;
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
			'3,5,7',
			'3,5,7,7',
			'3,8,7,8,12,6',
			'3,5,7,7',
			'3,8,7,8,12,6',
			'3,5,7,7',
			'3,8,7,8,12,6',
			'3,5,7,7',
			'3,8,7,8,12,6',
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
			'attack' : {
				'up' : 9,
				'right' : 5,
				'down' : 7,
				'left' : 11
			},
			'attack2' : {
				'up' : 10,
				'right' : 6,
				'down' : 8,
				'left' : 12
			},
			'attack3' : {
				'up' : 19,
				'right' : 15,
				'down' : 13,
				'left' : 17
			},
			'attack4' : {
				'up' : 20,
				'right' : 16,
				'down' : 14,
				'left' : 18
			}
		}
	});
};

export default Vegeta;
