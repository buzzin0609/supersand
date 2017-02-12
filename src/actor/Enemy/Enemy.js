import AutoActor from '../AutoActor';
import GameState from '../../shared/GameState';
import GameLoop from '../../gameloop/GameLoop';
import Collisionable from '../../collisions/Collisionable';
import Utils from '../../utils/utils';
import { addProfileCard, removeProfileCard } from '../StaticActorMethods';
import On from '../../utils/On';

const baseExp = 50;

export default class Enemy extends AutoActor {
    constructor(args) {
        super(args);
		this.type = 'enemy';
        this.isPulled = false;
        this.engaged = false;
        this.attacking = false;
        this.attackDelay = Utils.random(50, 100);
        this.attackLen = 0;
        this.hittable = false;
        this.sides = [];
        this.facing = false;
        this.offsetW = Math.floor(this.width / 2);
        this.offsetH = Math.floor(this.height / 4);

		this.expValue = Math.floor(baseExp + (0.10 * this.level * baseExp));
    }

    beforeRender() {
        if (this.dying) { return; }
        if (this.isPulled) {
            if (!this.engaged) {
                this.engaged = true;
                addProfileCard(this);
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
                removeProfileCard(this);
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
            x: characterPosition.x + widthOffset,
            y: characterPosition.y + heightOffset,
            width: widthOffset,
            height: heightOffset
        };

        if (!Collisionable.detect(position, battlePosition)) {
            if (this.attacking) {
                this.attacking = false;
            }
            if (this.hittable) {
                this.hittable = false;
            }

            this.follow();
        } else {
            if (!this.facing) {
                this.facing = this.direction;
            }
            if (!this.hittable) {
                this.hittable = true;
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

        for (let i = 0, keys = Object.keys(this.active), l = keys.length; i < l; i++) {
            this.active[keys[i]] = sides.includes(keys[i]);
        }
    }

    getSides() {
        let characterPosition = GameState.character.position;
        let {position} = this;

        return Collisionable.getSides(position, characterPosition, this.offsetW, this.offsetH);
    }

    resetActive() {
        let keys = Object.keys(this.active);
        let len = keys.length;
        let i = 0;
        
        for (; i < len; i++) {
            this.active[keys[i]] = false;
        }

    }

    attack() {
        if (this.attackDelay === 0) {
            if (!this.attacking) {
                let src = this.srcLocations.attack[this.facing];
                this.attacking = true;
                this.setSrc(src);
                this.attackLen = this.current.frames.length;

                GameState.character.receiveHit(this.generateHitValue());
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

    handleDeath() {
		this.unMount();
		On.trigger('enemy-defeated', this.expValue);
		
	}

	unMount() {
		setTimeout(() => {
			let {canvas} = this.scene;
			GameLoop.unregister(this.name, this.render.bind(this));
			canvas.parentElement.removeChild(canvas);
			removeProfileCard(this);
            GameState.character.enemies.forEach((enemy, i) => {
               if (this.name === enemy.name) {
                   GameState.character.enemies.splice(i, 1);
               }
            });
			On.trigger(`${this.name}-unmount`);
		}, 2000);
	}
}
