
var buildFrameArray = require('./buildFrameArray');
var Utils = require('../utils/utils');

var preRenderCanvas = document.createElement('canvas');
var preRenderCTX = preRenderCanvas.getContext('2d');

var required = [
	'name',
	'imgUrl',
	'frameLen',
	'frameTicks',
	'width',
	'height'
];

class Actor {
	constructor(args) {
		args = args || {};
		Utils.requiredProps(required, args);
		this.name = args.name;
		this.imgUrl = args.imgUrl;
		this.frames = buildFrameArray(args.frames);
		this.frameIndex = 0;
		this.beforeRender = args.beforeRender || false;

		this.width = args.width;
		this.height = args.height;

		this.start = {
			x : args.startX,
			y : args.startY
		};

		this.position = {};

		this.current = {
			frames : this.frames[0],
			x : 0,
			y : 0
		};

	}


	addScene(scene) {
		this.scene = scene;
		this.ctx = this.scene.canvas.getContext('2d');
		this.img = document.createElement('img');
		this.img.onload = () => {
			preRenderCTX.drawImage(this.img, this.width, this.height);
		};
		this.img.src = 'img/' + this.imgUrl;
		this.setPosition();

		Utils.debounce.on('resize', this.setPosition.bind(this));
	}

	setPosition() {
		this.position.x = (this.scene.canvas.width * this.start.x) - (this.width / 2);
		this.position.y = (this.scene.canvas.height * this.start.y) - (this.height / 2);
	}

	clear() {
		this.ctx.clearRect(this.position.x - this.width, this.position.y - this.height, this.width * 2, this.height * 3);
	}

	render() {
		this.clear();
		if (this.beforeRender) {
			this.beforeRender.call(this);
		}

		this.ctx.drawImage(this.img, this.current.x, this.current.y, this.width, this.height, this.position.x, this.position.y, this.width, this.height);

		this.frameIndex = (this.frameIndex + 1) % this.current.frames.length;
		this.current.x = this.current.frames[this.frameIndex] * this.width;
	}
}

module.exports = Actor;
