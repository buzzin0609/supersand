import React from 'react';
import SuperComponent from '../shared/SuperComponent';
var Scenes = require('./Scenes');
var GameLoop = require('../gameloop/GameLoop');
import Utils from '../utils/utils';
import Quadrant from '../collisions/Quadrant';
import Obstacle from '../collisions/Obstacle';

var required = [
	'target'
];

class Scene extends SuperComponent {

	constructor(props) {
		Utils.requiredProps(required, props);
		super(props);

		this.sceneEl = false;
		this.canvas = false;
		this.quadrants = [];

	}

	setDimensions() {

		var target = this.sceneEl;
		var percents = this.scenePercentages;

		this.width = this.canvas.width = Math.floor(target.offsetWidth * percents.width);
		this.height = this.canvas.height = Math.floor(target.offsetHeight * percents.height);
	}

	positionCanvas() {
		var el = this.sceneEl;
		var rect = el.getBoundingClientRect();
		var diff = {
			width : (rect.width - this.canvas.width) / 2,
			height : (rect.height - this.canvas.height) / 2
		};
		this.top = rect.top + diff.height;
		this.left = rect.left + diff.height;
		this.canvas.style.cssText = `position: absolute; top: ${this.top}px; left: ${this.left}px`;
	}

	componentDidMount() {

		this.elPromise = Utils.isImg(document.querySelector(this.props.target));

		this.elPromise.then(el => {
			this.sceneEl = el;
			var sceneArea = el.getAttribute('data-scene-area').split(' ').map(val => parseInt(val, 10));
			this.scenePercentages = {
				width : +(sceneArea[0] / el.naturalWidth).toFixed(2),
				height : +(sceneArea[1] / el.naturalHeight).toFixed(2)
			};
			this.naturalArea = {
				width : Math.floor(el.naturalWidth * this.scenePercentages.width),
				height : Math.floor(el.naturalHeight * this.scenePercentages.height)
			};
			this.canvas = Scenes.register(this.props.id, document.getElementById(this.props.id));
			this.ctx = this.canvas.getContext('2d');
			this.setDimensions();
			this.positionCanvas();
			this.props.actors.forEach(actor => {
				actor.addScene(this);
				GameLoop.register(actor.render.bind(actor));
			});
			if (this.props.obstacles) {
				// console.log(this.props.obstacles);
				this.setQuadrants();
				this.addObstacles();
			}

		});


		Utils.debounce.on('resize', [this.setDimensions.bind(this), this.positionCanvas.bind(this)]);

		// console.log(GameLoop);
	}

	setQuadrants() {
		var size = this.props.quadrantSize || 300;
		var qNum = Math.ceil((this.canvas.width / size) + (this.canvas.height / size));
		for (let i = 0; i < qNum; i++) {
			this.quadrants.push(new Quadrant(qNum, this, i));
		}

	}

	addObstacles() {
		var obstacles = [];
		for (let i = 0; i < this.props.obstacles.length; i++) {
			var args = this.props.obstacles[i];
			args.scene = this;
			obstacles.push(new Obstacle(args));

		}
		for (let i = 0; i < this.quadrants.length; i++) {
			this.quadrants[i].addChildren(obstacles);
		}
	}

	componentWillUnmount() {
		Scenes.unregister(this.props.id);
		Utils.debounce.off('resize', [this.setDimensions, this.positionCanvas]);
	}

	render() {
		return (
			<canvas id={this.props.id || ''}></canvas>
		)
	}
}

export default Scene;
