import Utils from '../utils/utils';
import GameLoop from '../gameloop/GameLoop';

var required = [
	'startX', 'startY',
	'width', 'height',
	'name',
	'scene'
];

var Factory = (function() {
	class Obstacle {
		constructor(args) {
			Utils.requiredProps(required, args);
			Object.assign(this, args);

			this.percentages = {
				width : +(this.width / this.scene.naturalArea.width).toFixed(2),
				height: +(this.height / this.scene.naturalArea.height).toFixed(2)
			};
			console.log(this.scene.naturalArea);
			this.x = false;
			this.y = false;
			this.setup();
			Utils.debounce.on('resize', this.setup.bind(this));
			GameLoop.register(() => {
				this.scene.ctx.fillRect(this.x, this.y, this.width, this.height);
			});
		}


		setup() {
			// let canvas = this.scene.canvas;
			var scene = this.scene;
			this.width = Math.floor(this.scene.width * this.percentages.width);
			this.height = Math.floor(this.scene.height * this.percentages.height);
			this.x = (scene.width * this.startX) - (this.width / 2);
			this.y = (scene.height * this.startY) - (this.height / 2);
			console.log(this);

			// this.x = Math.floor(this.width * rowIndex);
			// this.y = Math.floor(this.height * row);
		}



	}

	return Obstacle;

}());

export default Factory;
