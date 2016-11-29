
import Actor from './Actor';
import Events from '../events/Events';
import Utils from '../utils/utils';
import _ from '../shared/Private';

var required = [
	'srcLocations',
	'attributes'
];

var KeyboardActor = (function() {
	var directions = {
		'w' : 'up',
		'd' : 'right',
		's' : 'down',
		'a' : 'left'
	};


	return class KeyboardActor extends Actor {
		constructor(args) {
			Utils.requiredProps(required, args);
			super(args);
			_.set(this, { attributes : args.attributes});
			this.active = {
				'up' : false,
				'right' : false,
				'down' : false,
				'left' : false
			};
			this.direction = false;
			this.srcLocations = args.srcLocations;
			this.pressed = [];
			this.events();
		}

		events() {
			Events.on('keydown', this, this.keydown);
			Events.on('keyup', this, this.keyup);
		}

		unMount() {
			Events.off('keydown', this.keydown);
			Events.off('keyup', this.keyup);
		}

		keydown(e) {

			this.direction = this.getDirection(e.key);
			if (this.direction) {
				this.active[this.direction] = true;
				if (!this.pressed.includes(this.direction)) {
					this.pressed.unshift(this.direction);
					this.setSrc();
				}
			}

		}

		keyup(e) {
			this.direction = this.getDirection(e.key);
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
				this.current.y = src * this.height;
				this.current.x = 0;
				this.current.frames = this.frames[src];
			}
		}

		move() {
			var speed = _.get(this).attributes.speed;
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

		render() {

			if (this.pressed[0]) {
				this.move();
			} else {
				this.current.x = 0;
			}
			super.render();
		}
	};
}());



export default KeyboardActor;
