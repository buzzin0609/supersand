import MovingActor from './MovingActor';
// import GameState from '../shared/GameState';
import Utils from '../utils/utils';

function generatePath(numPoints) {
	return new Array(numPoints)
	.fill(5)
	.map((num, i) => (i + 1) * num);
}

const AutoActor = (function() {
	const path = generatePath(20);
	const directions = ['up', 'right', 'down', 'left'];

	return class AutoActor extends MovingActor {
		constructor(name, args) {
			super(name, args);
			this.pullArea = false;
			this.direction = false;
			this.path = false;
			this.patrolling = false;
			this.waitLength = Utils.random(50, 250);
			this.setPullZone();
		}

		setPullZone() {
			let pullHeight = this.height * 4;
			let pullWidth = this.width * 4;
			this.pullArea = {
				height : pullHeight,
				width : pullWidth,
				x : this.position.x - pullWidth / 2,
				y : this.position.y - pullHeight / 2
			};
		}

		setPatrol() {
			this.patrolling = true;
			let randomDirection = this.direction = directions[Utils.random(0, 4)];
			this.path = path[Utils.random(0,path.length - 1)];
			this.active[randomDirection] = true;


			this.pressed.push(randomDirection);
			this.setSrc(this.srcLocations[randomDirection]);
		}

		beforeRender() {
			if (!this.patrolling) {
				this.setPatrol();
			}

			super.move();

			this.patrol();
		}

		handleState() {
			this.setPullZone();
			super.handleState();
		}

		patrol() {
			if (this.path > 0) {
				this.path--;
			} else {
				if (this.pressed[0]) {
					this.pressed.shift();
					this.active[this.direction] = false;
				}
				this.wait();
			}
		}

		wait() {
			if (this.waitLength > 0) {
				this.current.x = 0;
				this.waitLength--;
			} else {
				this.setPatrol();
				this.waitLength = Utils.random(50, 150);
			}
		}

	};

}());


export default AutoActor;
