
import MovingActor from './MovingActor';
import Events from '../events/Events';

const KeyboardActor = (function() {
	const directions = {
		'ArrowUp' : 'up',
		'ArrowRight' : 'right',
		'ArrowDown' : 'down',
		'ArrowLeft' : 'left'
	};

	return class KeyboardActor extends MovingActor {
		constructor(args) {
			super(args);
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
			if (this.dying) { return; }
			this.direction = directions[e.key];
			if (this.direction) {
				this.active[this.direction] = true;
				if (!this.pressed.includes(this.direction)) {
					this.pressed.unshift(this.direction);
					this.setMoveSrc();
				}
			}
		}

		keyup(e) {
			if (this.dying) { return; }
			this.direction = directions[e.key];

			if (this.direction) {
				this.active[this.direction] = false;
				this.pressed = this.pressed.filter(key => key !== this.direction);
				this.setMoveSrc();
			}
			if (!this.pressed[0] && !this.dying && !this.attacking) {
				this.resetX();
			}
		}

		getDirection(value) {
			return directions[value];
		}

	};
}());



export default KeyboardActor;
