//noinspection JSLint
import Actor from './Actor';
import Utils from '../utils/utils';
import Collisionable from '../collisions/Collisionable';
import {incrementAttributes} from './StaticActorMethods';

const required = [
    'srcLocations',
    'attributes'
];

const incrementers = {
    health: 0.05,
    startHp: 0.05,
	speed: 0.01,
    strength: 0.02,
    maxKi: 0.05
};

const attrDefaults = {
    health: 100,
    strength: 2
};

const MovingActor = (function () {

    return class MovingActor extends Actor {
        constructor(args) {
            Utils.requiredProps(required, args);
            super(args);
            this.active = {
                up: false,
                right: false,
                down: false,
                left: false
            };
            this.pressed = [];
            this.previous = false;
            this.dying = false;
            this.dead = false;

            this.attributes = Object.assign({}, attrDefaults, args.attributes);
            this.attributes.startHp = this.attributes.health;
            this.setAttributes();
        }

        setAttributes() {
            let {attributes} = this;
            for (let i = 1; i <= this.level; i++) {
                attributes = this.incrementAttributes(attributes);
            }
            this.attributes = attributes;
        }

		incrementAttributes(attributes) {
			return incrementAttributes(attributes, incrementers);
		}

        setMoveSrc() {
            if (this.pressed[0]) {
                this.setSrc(this.srcLocations[this.pressed[0]]);
            }
        }

        setSrc(src) {
            this.resetX();
            this.setY(src);
        }

        resetX() {
            this.frameIndex = 0;
            this.current.x = 0;
        }

        setY(src) {
            this.current.y = src * this.height;
            this.current.frames = this.frames[src];
        }

		setX(src) {
			this.current.x = src * this.width;
		}

        move() {
            let speed = this.attributes.speed;
            this.previous = Object.assign({}, this.position);

            if (this.active.up) {
                this.position.y -= speed;
            }

            if (this.active.right) {
                this.position.x += speed;
            }

            if (this.active.down) {
                this.position.y += speed;
            }

            if (this.active.left) {
                this.position.x -= speed;
            }

            this.handleBoundaries();
            this.handleQuadrants(this.handleObstacles);

        }

        handleBoundaries() {
            let width = this.scene.canvas.width;
            let height = this.scene.canvas.height;
            let x = this.position.x;
            let y = this.position.y;
            if (x > width - this.width) {
                x = width - this.width;
            }
            if (x < 0) {
                x = 0;
            }
            if (y > height - this.height) {
                y = height - this.height;
            }
            if (y < 0) {
                y = 0;
            }

            this.position.x = x;
            this.position.y = y;
        }

        beforeRender() {
            if (this.pressed[0]) {
                this.move();
            }
        }

        handleState() {
            if (this.dying) {
                this.die();
            }
        }


        handleQuadrants(cb) {
            let quadrants = this.scene.quadrants;

            for (let i = 0, l = quadrants.length; i < l; i++) {
                if (Collisionable.detect(this.position, quadrants[i])) {
                    // console.log('in quadrant', quadrants[i]);
                    cb.call(this, quadrants[i]);

                }
            }
        }

        handleObstacles(quadrant) {
            let obstacles = quadrant.obstacles;
            let i = obstacles.length;
            while (--i >= 0) {
                if (Collisionable.detect(this.position, obstacles[i])) {

                    let side = Collisionable.detectSide(this.previous, obstacles[i]);
                    // console.log(side);
                    if (side === 'up' || side === 'down') {
                        this.position.y = this.previous.y;
                    }

                    if (side === 'left' || side === 'right') {
                        this.position.x = this.previous.x;
                    }

                }
            }
        }

        generateHitValue() {
            let {strength} = this.attributes;
            let minHit = Math.min(this.baseHit, strength);
            let maxHit = Utils.randomFloat(strength, Math.max(strength, strength * this.level));
            return this.baseHit + Utils.random(minHit, maxHit);
        }

        receiveHit(value) {
            this.handleHealth(value);
            if (this.attributes.health <= 0 && !this.dying) {
                this.setDying();
            }
        }

        handleHealth(value, addRemove = 'remove') {
            let {health} = this.attributes;
            if (addRemove === 'remove') {
                health -= value;
            } else {
                health += value;
            }
            this.attributes.health = health;
            this.profileCard.setHealth(value, addRemove);
        }

        setDying() {
            this.dying = true;
            this.setSrc(this.srcLocations.dying);
        }

        die() {
            this.setY(this.srcLocations.dying);
            if (this.frameIndex >= this.current.frames.length - 1) {
				if (!this.dead) {
					this.dead = true;
					this.handleDeath();
				}
            }

			if (this.dead) {
				let dyingFrames = this.frames[this.srcLocations.dying];
				this.setX(dyingFrames[dyingFrames.length - 1]);
			}
        }

		handleDeath() {
		}
    };
}());


export default MovingActor;
