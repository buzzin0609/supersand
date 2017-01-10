import Utils from '../utils/utils';
import Collisionable from './Collisionable';


var required = [
	'canvas'
];

var Factory = (function() {
	var id = 1;
	class Quadrant {
		constructor(qNum, scene, sceneIndex) {
			Utils.requiredProps(required, scene);
			this.id = id;
			id++;
			this.height = false;
			this.width = false;
			this.x = false;
			this.y = false;
			this.obstacles = [];
			this.qNum = qNum;
			this.scene = scene;
			this.index = sceneIndex;
			this.setup();
			Utils.debounce.on('resize', this.setup.bind(this));
		}

		setup() {
			let canvas = this.scene.canvas;
			let rows = this.qNum / 4;
			this.height = Math.floor(canvas.height / rows);
			this.width = Math.floor(canvas.width / rows);
			let rowIndex = this.index % rows;
			let row = Math.floor(this.index / rows);
			this.x = Math.floor(this.width * rowIndex);
			this.y = Math.floor(this.height * row);
		}

		addChildren(obstacles) {
			obstacles.forEach(obstacle => {
				if (Collisionable.detect(obstacle, this)) {
					this.obstacles.push(obstacle);
				}

			});
			// console.log(this.obstacles, 'children');
		}

	}

	return Quadrant;

}());

export default Factory;
