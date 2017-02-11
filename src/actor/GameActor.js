import KeyboardActor from './KeyboardActor';
import Utils from '../utils/utils';
import Collisionable from '../collisions/Collisionable';
import { addProfileCard, removeProfileCard } from './StaticActorMethods';
import GameState from '../shared/GameState';

// const required = [
//
// ];

const requiredSrcLocations = [
	'attack'
];

const attacks = {
	'a' : 'attack',
	's' : 'attack2',
	'd' : 'attack3',
	'f' : 'attack4'
};

class GameActor extends KeyboardActor {
	constructor(args) {
		Utils.requiredProps(requiredSrcLocations, args.srcLocations);
		super(args);
		this.facing = 'down';
		this.comboState = 1;
		this.comboQueued = false;
		this.attacks = args.attacks || attacks;
		this.resetAttackState();
	}



	resetAttackState() {
		this.startAttack = false;
		this.attacking = false;
		this.attackType = '';
		this.attackCount = 0;
		this.currentAttackLen = 0;
		if (!this.comboQueued) {
			this.comboState = 1;
		}
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

		let attack = attacks[e.key];
		if (!this.attacking) {
			this.attackType = attack;
			if (attack) {
				this.attacking = true;
			}
		}
	}


	beforeRender() {
		if (this.dying) { return; }
		if (this.pressed[0]) {
			this.move();
		}

		if (this.attacking) {
			this.attack();
		}

		if (!this.pressed[0] && !this.attacking) {
			this.current.x = 0;
		}

		if (!this.profileRendered) {
			this.profileRendered = true;
			addProfileCard(this);
		}


	}

	attack() {
		if (!this.startAttack) {
			this.setAttack();
		}
		this.attackCount++;
		if (this.attackCount >= this.currentAttackLen) {
			this.resetAttack();
		}
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

	handleState() {
		if (this.enemies) {
			this.handleEnemies();
		}
		super.handleState();
	}

	handleEnemies() {
		let { enemies } = this;
		let i = enemies.length;

		while (--i >= 0) {
			let enemy = enemies[i];
			if (Collisionable.detect(this.position, enemy.pullArea)) {
				enemy.isPulled = true;
			} else if (enemy.isPulled) {
				enemy.isPulled = false;
			}
		}
	}

	die() {
		super.die();
		if (this.dead) {
			let setView = GameState.get('setView');
			removeProfileCard(this);
			setView('gameOver');
		}
	}

}

export default GameActor;
