import AutoActor from '../AutoActor';
import GameState from '../../shared/GameState';
import Collisionable from '../../collisions/Collisionable';
import Utils from '../../utils/utils';

export default class Enemy extends AutoActor {
	constructor(args) {
		super(args);
		this.isPulled = false;
		this.engaged = false;
		this.attacking = false;
		this.attackDelay = Utils.random(50, 100);
		this.attackLen = 0;
		this.sides = [];
		this.facing = false;
		this.offsetW = Math.floor(this.width / 2);
		this.offsetH = Math.floor(this.height / 4);
	}

	beforeRender() {
		if (this.isPulled) {
			if (!this.engaged) {
				this.engaged = true;
			}
			this.engageCharacter();
			super.move();
		} else {
			if (this.engaged) {
				this.engaged = false;
				this.resetActive();
				//this makes sure the patrol starts back from the beginning
				this.path = 0;
				this.resetX();
			}
			super.beforeRender();
		}

	}

	engageCharacter() {
		let { position } = this;
		let characterPosition = GameState.character.position;
		let widthOffset = characterPosition.width / 2;
		let heightOffset = characterPosition.height / 4;
		let battlePosition = {
			x : characterPosition.x + widthOffset,
			y : characterPosition.y + heightOffset,
			width : widthOffset,
			height : heightOffset
		};

		if (!Collisionable.detect(position, battlePosition)) {
			if (this.attacking) {
				this.attacking = false;
			}
			this.follow();
		} else {

			if (!this.facing) {
				this.facing = this.direction;
			}
			this.resetActive();
			this.attack();
		}
	}

	follow() {

		let sides = this.getSides();

		if (sides.length) {
			this.setY(this.srcLocations[sides[0]]);
			this.facing = sides[0];
		}

		Object.keys(this.active).forEach(s => {
			if (sides.includes(s)) {
				this.active[s] = true;
			} else {
				this.active[s] = false;
			}
		});
	}

	getSides() {
		let characterPosition = GameState.character.position;
		let { position } = this;

		return Collisionable.getSides(position, characterPosition, this.offsetW, this.offsetH);
	}

	resetActive() {
		Object.keys(this.active).forEach(side => this.active[side] = false);
	}

	attack() {
		if (this.attackDelay === 0) {
			if (!this.attacking) {
				let src = this.srcLocations.attack[this.facing];
				this.attacking = true;
				this.setSrc(src);
				this.attackLen = this.current.frames.length;
			}

		} else {
			this.resetX();
			this.attackDelay--;
			return;
		}

		if (this.attackLen > 0) {
			this.attackLen--;
		} else {
			this.setSrc(this.srcLocations[this.facing]);
			this.attackDelay = Utils.random(50, 100);
			this.attacking = false;
		}

	}
}
