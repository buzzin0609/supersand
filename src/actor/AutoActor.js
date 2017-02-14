//noinspection JSLint
import MovingActor from "./MovingActor";
import Utils from "../utils/utils";
import { timeout } from './StaticActorMethods';
// import GameState from '../shared/GameState';

function generatePath(numPoints) {
	return new Array(numPoints)
	.fill(5)
	.map((num, i) => (i + 1) * num);
}

const AutoActor = (function() {
	const path = generatePath(20);
	const directions = ['up', 'right', 'down', 'left'];

	return class AutoActor extends MovingActor {
		constructor(args) {
			super(args);
			this.pullArea = false;
			this.direction = false;
			this.path = false;
			this.patrolling = false;
			this.startPatrol = args.patrolOnStart !== undefined ? args.patrolOnStart : true;
			this.waitLength = Utils.random(500, 2500);
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

		getRandomDirection() {
			return directions[Utils.random(0, 4)];
		}
		setPatrol() {
			this.patrolling = true;
			let randomDirection = this.getRandomDirection();

			this.direction = randomDirection;
			this.path = path[Utils.random(0,path.length - 1)];
			this.active[randomDirection] = true;


			this.pressed.push(randomDirection);
			this.setSrc(this.srcLocations[randomDirection]);
			this.startRender();
		}

		beforeRender() {
			if (this.startPatrol) {
				if (!this.patrolling) {
					this.setPatrol();
				} else {
					super.move();
					this.patrol();
				}
			} else {
				this.resetX();

			}
		}

		handleState() {
			this.setPullZone();
			super.handleState();
		}

		patrol() {
			if (this.path === 0) {
				if (this.pressed.shift()) {
					this.active[this.direction] = false;
				}
				this.path--;
				this.wait();
			} else {
				this.path--;
			}
		}

		async wait() {
			this.stopRender();
			await timeout(this.waitLength);
			this.patrolling = false;
			this.render();
			this.waitLength = Utils.random(500, 2500);
		}

	};

}());


export default AutoActor;
