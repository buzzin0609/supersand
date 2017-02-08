var buildFrameArray = require('./buildFrameArray');
var Utils = require('../utils/utils');

var preRenderCanvas = document.createElement('canvas');
var preRenderCTX = preRenderCanvas.getContext('2d');

var required = [
	'name',
	'imgUrl',
	'width',
	'height'
];


class Actor {
	constructor(args) {
		args = args || {};
		Utils.requiredProps(required, args);
		this.name = args.name;
		this.imgUrl = args.imgUrl;
		this.profilePic = args.profilePic;
		this.profileRendered = false;
		this.frames = Array.isArray(args.frames[0]) ? args.frames : buildFrameArray(args.frames);
		this.frameIndex = 0;

		this.enemies = false;

		this.width = args.width;
		this.height = args.height;

		this.start = args.start || {
			x : args.startX,
			y : args.startY
		};

		this.position = args.position || {
			width: this.width,
			height: this.height
		};

		this.current = {
			frames : this.frames[0],
			x : 0,
			y : 0
		};
		this.attributes = args.attributes || {};
		this.baseHit = args.baseHit || 4;
		this.direction = false;
		this.srcLocations = args.srcLocations;
		this.initialised = Date.now();

		this.level = args.level || 1;

	}

	addEnemies(enemies) {
		this.enemies = enemies;
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

		// Utils.debounce.on('resize', this.setPosition.bind(this));
	}

	setPosition() {
		this.position.x = Math.floor((this.scene.canvas.width * this.start.x) - (this.width / 2));
		this.position.y = Math.floor((this.scene.canvas.height * this.start.y) - (this.height / 2));
	}

	clear() {
		let box = this.attributes.speed * 5;
		this.ctx.clearRect(this.position.x - box / 2, this.position.y - box / 2, this.width + box, this.height + box);
	}

	render() {
		this.beforeRender();
		this.handleState();
		this.clear();
		this.frameIndex = (this.frameIndex + 1) % this.current.frames.length;
		this.ctx.drawImage(this.img, this.current.x, this.current.y, this.width, this.height, this.position.x, this.position.y, this.width, this.height);

		this.current.x = this.current.frames[this.frameIndex] * this.width;

	}

	beforeRender() {}
	handleState() {}
}

module.exports = Actor;
