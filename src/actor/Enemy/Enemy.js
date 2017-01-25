import AutoActor from '../AutoActor';
import GameState from '../../shared/GameState';
import Collisionable from '../../collisions/Collisionable';

export default class Enemy extends AutoActor {
	constructor(name, args) {
		super(name, args);
		this.isPulled = false;
		this.engaged = false;
		this.fighting = false;
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
			if (this.fighting) {
				this.fighting = false;
			}
			this.follow();
		} else {
			this.resetActive();
			if (!this.fighting) {
				this.fighting = true;
			}
		}
	}

	follow() {
		let characterPosition = GameState.character.position;
		let { position } = this;
		let offsetW = Math.floor(this.width / 6);
		let offsetH = this.height / 4;

		if (position.y > characterPosition.y + offsetH) {
			this.setY(this.srcLocations.up);
			this.active.up = true;
			this.active.down = false;
		} else {
			this.active.up = false;
		}

		if (position.y < characterPosition.y - offsetH) {
			this.setY(this.srcLocations.down);
			this.active.down = true;
			this.active.up = false;
		} else {
			this.active.down = false;
		}
		
		if (position.x > characterPosition.x + offsetW) {
			this.setY(this.srcLocations.left);
			this.active.left = true;
			this.active.right = false;
		} else {
			this.active.left = false;
		}

		if (position.x < characterPosition.x - offsetW) {
			this.setY(this.srcLocations.right);
			this.active.right = true;
			this.active.left = false;
		} else {
			this.active.right = false;
		}


	}

	resetActive() {
		let dir;
		for (dir in this.active) {
			this.active[dir] = false;
		}
		this.resetX();
	}
}
