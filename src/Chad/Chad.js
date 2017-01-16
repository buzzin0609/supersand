import GameActor from '../actor/GameActor';

const Chad = function(args = false) {
	let normalWidth = 45;
	let sideWidth = 51;
	let attackWidth = 70;
	class ChadCharacter extends GameActor {
		beforeRender() {
			super.beforeRender();

			if (!this.attacking) {
				if (['left', 'right'].includes(this.pressed[0])) {
					this.width = sideWidth;
				} else {
					this.width = normalWidth;
				}
			}
		}

		setAttack() {
			super.setAttack();
			this.width = attackWidth;
		}

		resetAttack() {
			super.resetAttack();
			console.log(this.width);
			this.width = normalWidth;
		}
	}

	if (args) {
		return new ChadCharacter(args);
	}

	return new ChadCharacter({
		name : 'Chad Sexington',
		imgUrl : 'chad-sexington-spritesheet.png',
		profilePic : 'chad-profile.png',
		attributes : {
			'speed' : 3
		},
		frames : [
			'1',
			'8,8,8,8,8,8',
			'8,8,8,8,8,8',
			'8,8,8,8,8,8',
			'8,8,8,8,8,8',
			'3,5,5,5,5,5'
		],
		width : normalWidth,
		height : 62,
		startX : 0.5,
		startY : 0.6,
		srcLocations : {
			'up' : 2,
			'right' : 4,
			'down' : 1,
			'left' : 3,
			'normal' : 0,
			'attack' : {
				'up' : 5,
				'right' : 5,
				'down' : 5,
				'left' : 5
			}
		}
	});
};

export default Chad;
