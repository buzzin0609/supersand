import KeyboardActor from './KeyboardActor';
import Utils from '../utils/utils';

// const required = [
//
// ];

const requiredSrcLocations = [
	'punch'
];

const attacks = {
	'd' : 'punch'
};

class GameActor extends KeyboardActor {
	constructor(args) {
		Utils.requiredProps(requiredSrcLocations, args.srcLocations);
		super(args);
		this.facing = 'down';
		this.resetAttackState();
	}

	resetAttackState() {
		this.startAttack = false;
		this.attacking = false;
		this.attackType = '';
		this.attackCount = 0;
		this.currentAttackLen = 0;
	}

	setMoveSrc() {
		if (this.pressed[0] && !this.attacking) {
			this.setSrc(this.srcLocations[this.pressed[0]]);
			// console.log('set src', this);

		}
	}

	keydown(e) {
		super.keydown(e);

		if (this.pressed[0]) {
			this.facing = this.pressed[0];
		}

		if (!this.attacking) {
			this.attackType = attacks[e.key];
			if (this.attackType) {
				this.attacking = true;
			}
		}
	}


	beforeRender() {
		if (this.pressed[0]) {
			this.move();
		}

		if (this.attacking) {
			this[this.attackType]();
		}

		if (!this.pressed[0] && !this.attacking) {
			this.current.x = 0;
		}

	}

	punch() {
		if (!this.startAttack) {
			this.setAttack();
		}
		this.attackCount++;
		if (this.attackCount >= this.currentAttackLen) {
			this.resetAttack();
		}
		// console.log(this.frameIndex);
	}

	setAttack() {
		this.startAttack = true;
		this.setSrc(this.srcLocations[this.attackType][this.facing]);
		this.currentAttackLen = this.current.frames.length;
	}

	resetAttack() {
		this.resetAttackState();
		this.setSrc(this.srcLocations[this.facing]);
	}

}

export default GameActor;
