//noinspection JSLint
import KeyboardActor from './KeyboardActor';
import Utils from '../utils/utils';
import Collisionable from '../collisions/Collisionable';
import {addProfileCard, removeProfileCard} from './StaticActorMethods';
import GameState from '../shared/GameState';
import GameLoop from '../gameloop/GameLoop';
import '../levelling/registerLevelling';

// const required = [
//
// ];

const requiredSrcLocations = [
    'attack'
];

const attacks = {
    'a': 'attack',
    's': 'attack2',
    'd': 'attack3',
    'f': 'attack4'
};

const oppositeDirections = {
	'up': 'down',
	'right': 'left',
	'down': 'up',
	'left': 'right'
};

function isOpposite(direction1, direction2) {
	return oppositeDirections[direction1] === direction2;
}

class GameActor extends KeyboardActor {
    constructor(args) {
        Utils.requiredProps(requiredSrcLocations, args.srcLocations);
        super(args);
        this.facing = 'down';
        this.comboState = 1;
        this.comboQueued = false;
		this.isPulled = false;
		this.attributes.maxKi = args.attributes.maxKi || 100;
		this.attributes.ki = 0;

		this.attributes.expToLevel = args.attributes.expToLevel || 200;
		this.attributes.exp = args.exp || 0;
        //noinspection JSUnresolvedVariable
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
            this.startRender();
            if (attack) {
                this.attacking = true;
            }
        }
    }

    beforeRender() {
        if (this.dying) {
            return;
        }
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
			if (!this.pressed[0]) {
            	this.stopRender();
			}
        }
    }

    setAttack() {
        this.startAttack = true;
        this.setSrc(this.srcLocations[this.attackType][this.facing]);
        this.currentAttackLen = this.current.frames.length;
        this.handleHitEnemies();
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
        let {enemies} = this;
        let i = enemies.length;

        while (--i >= 0) {
            let enemy = enemies[i];
			let isPulled = false;
            if (Collisionable.detect(this.position, enemy.pullArea)) {
                enemy.isPulled = true;
				enemy.startRender();
				isPulled = true;
            } else if (enemy.isPulled) {
                enemy.isPulled = false;
				enemy.stopRender();
            }

			this.isPulled = isPulled;
        }
    }

    handleHitEnemies() {
        let {enemies} = this;
        let i = enemies.length;

        while (--i >= 0) {
            let enemy = enemies[i];
			
            if (enemy.hittable && isOpposite(this.facing, enemy.facing)) {
                enemy.receiveHit.call(enemy, this.generateHitValue());
            }
        }
    }

	handleDeath() {
		GameLoop.stop.call(GameLoop);
		let setView = GameState.get('setView');
		removeProfileCard(this);
		setView('gameOver');
	}
	


}

export default GameActor;
