
import Actor from './Actor';
import Events from '../events/Events';
import Utils from '../utils/utils';
import _ from '../shared/Private';
import Collisionable from '../collisions/Collisionable';

var required = [
	'srcLocations',
	'attributes'
];

var KeyboardActor = (function() {
	var directions = {
		'ArrowUp' : 'up',
		'ArrowRight' : 'right',
		'ArrowDown' : 'down',
		'ArrowLeft' : 'left'
	};


	return class KeyboardActor extends Actor {
		constructor(args) {
			Utils.requiredProps(required, args);
			super(args);
			this.attributes = args.attributes;
			this.active = {
				up : false,
				right : false,
				down : false,
				left : false
			};
			this.direction = false;
			this.srcLocations = args.srcLocations;
			this.pressed = [];
			this.previous = false;
			this.initialised = Date.now();
			this.events.bind(this);

		}

		events() {
			this.keydownEvent = Events.on('keydown', this.keydown.bind(this));
			this.keyupEvent = Events.on('keyup', this.keyup.bind(this));
		}

		unMount() {
			Events.off('keydown', this.keydownEvent);
			Events.off('keyup', this.keyupEvent);
		}

		keydown(e) {
			this.direction = directions[e.key];
			if (this.direction) {
				this.active[this.direction] = true;
				if (!this.pressed.includes(this.direction)) {
					this.pressed.unshift(this.direction);
					this.setSrc();
				}
			}

		}

		keyup(e) {
			this.direction = directions[e.key];
			// console.log('triggering keyup', this);
			if (this.direction) {
				this.active[this.direction] = false;
				this.pressed = this.pressed.filter(key => key !== this.direction);
				this.setSrc();
			}
		}

		getDirection(value) {
			return directions[value];
		}

		setSrc() {
			if (this.pressed[0]) {
				var src = this.srcLocations[this.pressed[0]];
				// console.log('set src', this);
				this.current.y = src * this.height;
				this.current.x = 0;
				this.current.frames = this.frames[src];
			}
		}

		move() {
			var speed = this.attributes.speed;
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
			this.handleQuadrants();
		}

		handleBoundaries() {
			var width = this.scene.canvas.width;
			var height = this.scene.canvas.height;
			var x = this.position.x;
			var y = this.position.y;
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

		handleQuadrants() {
			let quadrants = this.scene.quadrants;

			for (let i = 0, l = quadrants.length; i < l; i++) {
				if (Collisionable.detect(this.position, quadrants[i])) {
					// console.log('in quadrant', quadrants[i]);
					this.handleObstacles(quadrants[i]);
					// break;
				}
			}
		}

		handleObstacles(quadrant) {
			let obstacles = quadrant.obstacles;
			for (let i = 0, l = obstacles.length; i < l; i++) {
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

		beforeRender() {
			if (this.pressed[0]) {
				this.move();
			} else {
				this.current.x = 0;
			}
		}

	};
}());



export default KeyboardActor;
