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

			this.x = false;
			this.y = false;
			this.percentages = {
				width: args.width,
				height: args.height
			};
			this.setup();
			Utils.debounce.on('resize', this.setup.bind(this));
			GameLoop.register(this.render.bind(this));
		}


		setup() {
			// let canvas = this.scene.canvas;
			var scene = this.scene;
			this.width = Math.floor(scene.canvas.width * this.percentages.width);
			this.height = Math.floor(scene.canvas.height * this.percentages.height);
			this.x = Math.floor(scene.canvas.width * this.startX);
			this.y = Math.floor(scene.canvas.height * this.startY);
			console.log(this);

		}

		render() {
			this.scene.ctx.fillRect(this.x, this.y, this.width, this.height);
		}

		unregister() {
			GameLoop.unregister(this.render.bind(this));
		}


	}

	return Obstacle;

}());

export default Factory;
